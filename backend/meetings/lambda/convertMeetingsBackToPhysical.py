
import boto3
import json
import re
import os
import datetime
import requests

HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
}

dynamodb = boto3.resource('dynamodb')

#logging func
def log(msg, level, trace = "NULL"):
    if trace == "NULL":
        print(datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")+ " " + 
"[" + level + "]" + " " + msg)
    else:
        print(datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")+ " " + 
"[" + level + "]" + " " + msg, trace)

class RequestResponseProcessor:
    '''
    Class handler for request
    '''
    def __init__(self, event):
        self._unvalidatedRequest = json.loads(event["body"])
        self._validatedRequest = {}
        self._regex = {
            "userEmail": r"^[0-9a-zA-Z.-_]{0,256}@[0-9a-zA-Z.-_]{0,256}$",
            "startTime": r"^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]*Z$",
            "endTime": r"^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]*Z$" 
        }
        self._requiredAttributes = ["userEmail", "startTime", "endTime"]
        self._outlookHeaders = {'Authorization': event['headers']['Authorization']}
        self._optionalAttributes = []
        self._tableName = os.environ["CONVERTED_MEETINGS_TABLE_NAME"]
        self._getCalendarURL = "https://graph.microsoft.com/v1.0/me/calendar/calendarView?startDateTime={start_datetime}&endDateTime={end_datetime}"
        self._patchEventURL = "https://graph.microsoft.com/v1.0/me/events/{id}"
        self._convertedEventIds = []
        self._originalLocations = []

    def orchestrate(self):
        '''
        Main orchestrating function
        '''
        self.validateRequest()
        self.getConvertedEvents()
        self.updateEvents()
        self.removeConvertedEvents()
        return {
            'statusCode': 200,
            'body': json.dumps("Success"),
            'headers': HEADERS
        }

    def validateRequest(self):
        '''
        Code for validating requests
        '''
        #Predefining errorResponse
        errorResponse = json.dumps({
            "statusCode": 400,
            "message": "Validation failed.",
            "headers": HEADERS
        })
        # ensure unvalidated request contains all required attributes
        if not set(self._requiredAttributes).issubset(set(self._unvalidatedRequest.keys())):
            log("[VALIDATION] Failed due to required Attributes not present #1, required: " + \
                    str(self._requiredAttributes) + ", request: " + str(self._unvalidatedRequest), "ERROR")
            raise Exception(errorResponse)
        else:
            # ensure unvalidated request does not have extra attributes outside of those specified in required & optional attributes
            if len(set(self._unvalidatedRequest.keys()).intersection(self._requiredAttributes + \
                self._optionalAttributes)) == len(self._unvalidatedRequest.keys()):
                for key, value in self._unvalidatedRequest.items():
                    match = re.findall(self._regex[key], value)
                    # ensure only one match for the regex
                    if len(match) == 1:
                        self._validatedRequest[key] = value
                    else:
                        log("[VALIDATION] Failed due more than 1 match for Attribute: " + str(self._regex[key]) + \
                        ", matches = " + str(len(match)), "ERROR")
                        raise Exception(errorResponse)
            else:
                log("[VALIDATION] Failed due to required Attributes not present #2, required: " + \
                    str(self._requiredAttributes) + ", request: " + str(self._unvalidatedRequest), "INFO")
                raise Exception(errorResponse)
        log("[VALIDATION] Success" + str(self._validatedRequest), "INFO")

    def getConvertedEvents(self):
        try:
            table = dynamodb.Table(self._tableName)

            response = table.get_item(
                Key={
                    "date": datetime.datetime.today().strftime('%d/%m/%Y'),
                    "userEmail": self._validatedRequest["userEmail"]
                }
            )
            if "Item" in response:
                self._convertedEventIds = response["Item"]["convertedEventIds"]
                self._originalLocations = response["Item"]["originalLocations"]
                log("[GetConvertedEvents] Successfully fetched previously converted meetings.", "INFO")
            else:
                log("[GetConvertedEvents] No previously converted meetings.", "INFO", e)
        
        except Exception as e:
            log("[GetConvertedEvents] Failed.", "ERROR", e)
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Error interacting with DynamoDB",
                    "headers": HEADERS
                })
            )

    def updateEvents(self):
        '''
        Update today's remaining calendar events.

        Events between startTime and endTime are fetched again instead of stored in the database because event times
        may be updated to a time in the future thus requiring thier locations to be reverted as well. Hence the most
        updated time data must be pulled.
        '''
        try:
            # get current meeting invites for the given interval, where the current user is the organizer
            res = requests.get(self._getCalendarURL.format(start_datetime = self._validatedRequest["startTime"], \
                                                        end_datetime = self._validatedRequest["endTime"]),\
                                headers = self._outlookHeaders).content.decode("utf-8")
            resObj = json.loads(res)
            if "error" in res:
                log("Calendar retrieval failed: " + str(resObj), "INFO")
                raise Exception(json.dumps({
                        "statusCode": 500,
                        "message": "Error with callling MS get API: " + str(resObj["error"]["code"]),
                        "headers": HEADERS
                    })
                )
            log("Calendar retrieval successful: " + res, "INFO")

            # update physical events to zoom links
            self._outlookHeaders["Content-Type"] = "application/json"
            for event in resObj["value"]:
                if (event["id"] in self._convertedEventIds):
                    idx = self._convertedEventIds.index(event["id"])
                    self.convertEventBack(idx)
                    
            log("All events in calendar updated successfully.", "INFO")
                
        except Exception as e:
            log("Fetch all events and conversion back failed.", "ERROR", e)
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Error converting meetings back to original location.",
                    "headers": HEADERS
                })
            )

    def convertEventBack(self, idx):
        try:
            response = requests.patch(self._patchEventURL.format(id = self._convertedEventIds[idx]), \
                                        headers = self._outlookHeaders,
                                        json = {
                                            "location": {
                                                "displayName": self._originalLocations[idx],
                                                "uniqueId": self._originalLocations[idx]
                                            }
                                        }).content.decode("utf-8")
            responseObj = json.loads(response)
            if "error" in response:
                log("[ConvertEventsBack] Calendar update failed: " + str(responseObj), "INFO")
                raise Exception(json.dumps({
                        "statusCode": 500,
                        "message": "Error returned from MS patch API: " + str(responseObj["error"]["code"]),
                        "headers": HEADERS
                    })
                )

            log("[ConvertEventsBack] Event update successful for event #" + str(idx), "INFO")

        except Exception as e:
            log("[ConvertEventsBack] Event update failed for event #" + str(idx), "ERROR", e)
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Error with callling MS patch API",
                    "headers": HEADERS
                })
            )

    def removeConvertedEvents(self):
        try:
            table = dynamodb.Table(self._tableName)

            # delete existing entry, if any
            table.delete_item(
                Key={
                    "date": datetime.datetime.today().strftime('%d/%m/%Y'),
                    "userEmail": self._validatedRequest["userEmail"]
                }
            )
            log("[RemoveConvertedEvents] Deleted all converted events data in the db.", "INFO")

        except Exception as e:
            log("[RemoveConvertedEvents] Failed.", "ERROR", e)
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Error interacting with DynamoDB",
                    "headers": HEADERS
                })
            )


def lambda_handler(event, context):
    req = RequestResponseProcessor(event)
    res = req.orchestrate()
    log("[RESPONSE] " + str(res), "INFO")
    return res
