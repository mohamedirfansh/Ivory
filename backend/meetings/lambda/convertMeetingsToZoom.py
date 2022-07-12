
import boto3
import json
import re
import datetime
import requests

HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
}

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
        print("start: " + self._unvalidatedRequest["startTime"])
        print("end: " + self._unvalidatedRequest["endTime"])
        self._validatedRequest = {}
        self._regex = {
            "userEmail": r"^[0-9a-zA-Z.-_]{0,256}@[0-9a-zA-Z.-_]{0,256}$", # don't need this if we hardcode the token.. but for zoom & outlook apis
            "startTime": r"^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]*Z$",
            "endTime": r"^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]*Z$" 
        }
        self._requiredAttributes = ["userEmail", "startTime", "endTime"]
        self._outlookHeaders = {'Authorization': event['headers']['Authorization']}
        self._optionalAttributes = []
        self._getCalendarURL = "https://graph.microsoft.com/v1.0/me/calendar/calendarView?startDateTime={start_datetime}&endDateTime={end_datetime}"
        self._patchEventURL = "https://graph.microsoft.com/v1.0/me/events/{id}"
        # we assume the zoom createMeeting api returns this for us
        self._meetingDetails = "https://www.zoom.us/j/87211496830 (Passcode: 472216)"

    def orchestrate(self):
        '''
        Main orchestrating function
        '''
        self.validateRequest()
        self.updateCalendar()
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
            log("[ConvertMeetingsToZoom VALIDATION] Failed due to required Attributes not present #1, required: " + \
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
                        log("[ConvertMeetingsToZoom VALIDATION] Failed due more than 1 match for Attribute: " + str(self._regex[key]) + \
                        ", matches = " + str(len(match)), "ERROR")
                        raise Exception(errorResponse)
            else:
                log("[ConvertMeetingsToZoom VALIDATION] Failed due to required Attributes not present #2, required: " + \
                    str(self._requiredAttributes) + ", request: " + str(self._unvalidatedRequest), "INFO")
                raise Exception(errorResponse)
        log("[ConvertMeetingsToZoom VALIDATION] Success" + str(self._validatedRequest), "INFO")

    def updateCalendar(self):
        try:
            # get current meeting invites for the given interval, where the current user is the organizer
            res = requests.get(self._getCalendarURL.format(start_datetime = self._validatedRequest["startTime"], \
                                                        end_datetime = self._validatedRequest["endTime"]),\
                                headers = self._outlookHeaders).content.decode("utf-8")
            resObj = json.loads(res)
            if "error" in res:
                log("[ConvertMeetingsToZoom] Calendar retrieval failed: " + str(resObj), "INFO")
                raise Exception(json.dumps({
                        "statusCode": 500,
                        "message": "Error with callling MS get API: " + str(resObj["error"]["code"]),
                        "headers": HEADERS
                    })
                )
            log("[ConvertMeetingsToZoom] Calendar retrieval successful: " + res, "INFO")

            # update physical events to zoom links
            self._outlookHeaders["Content-Type"] = "application/json"
            for event in resObj["value"]:
                if (event["isOrganizer"] and not (event["isOnlineMeeting"] or \
                "zoom" in (event["location"]["displayName"] or event["body"]["content"]))):
                    response = requests.patch(self._patchEventURL.format(id = event["id"]), \
                                                headers = self._outlookHeaders,
                                                json = {
                                                    "location": {
                                                        "displayName": self._meetingDetails,
                                                        "uniqueId": self._meetingDetails
                                                    }
                                                }).content.decode("utf-8")
                    responseObj = json.loads(response)
                    if "error" in response:
                        log("[ConvertMeetingsToZoom] Calendar update failed: " + str(responseObj), "INFO")
                        raise Exception(json.dumps({
                                "statusCode": 500,
                                "message": "Error with callling MS patch API: " + str(responseObj["error"]["code"]),
                                "headers": HEADERS
                            })
                        )
                    log("[ConvertMeetingsToZoom] Event update successful for " + event["subject"], "INFO")
                    
            log("[ConvertMeetingsToZoom] All events in calendar updated successfully.", "INFO")
                
        except Exception as e:
            log("[ConvertMeetingsToZoom] Failed.", "ERROR", e)
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Error converting meetings to zoom.",
                    "headers": HEADERS
                })
            )


def lambda_handler(event, context):
    req = RequestResponseProcessor(event)
    res = req.orchestrate()
    log("[RESPONSE] " + str(res), "INFO")
    return res
