
import boto3
import json
import re
import datetime
import os
import uuid

HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
}

dynamodb = boto3.resource('dynamodb')

# logging function
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
            "userEmail": r"^[ a-zA-Z0-9]{0,128}@[ a-zA-Z0-9]{0,127}$",
            "title": r"^[ a-zA-Z0-9]{0,256}$",
            "description": r"^[ a-zA-Z0-9]{0,256}$",
            "deadline": r"^[0-9]{2}/[0-9]{2}/[0-9]{4}$",
            "priority": r"^[ a-zA-Z0-9]{0,256}$",
            "done": r"^[ a-zA-Z]{0,256}$"
        }
        self._requiredAttributes = ["userEmail", "title", "description", "deadline", "priority", "done"]
        self._optionalAttributes = []
        self._tableName = os.environ["TODOS_TABLE_NAME"]
    
    def orchestrate(self):
        '''
        Main orchestrating function
        '''
        self.validateRequest()
        self.create()
        return {
            "statusCode": 200,
            "body": json.dumps("Success"),
            'headers': HEADERS
        }

    def validateRequest(self):
        '''
        Code for validating requests
        '''
        # predefining errorResponse
        errorResponse = json.dumps({
            "statusCode": 400,
            "message": "Validation failed.",
            "headers": HEADERS
        })
        # ensure unvalidated request contains all required attributes
        if not set(self._requiredAttributes).issubset(set(self._unvalidatedRequest.keys())):
            log("[CreateTodo VALIDATION] Failed due to required Attributes not present #1, required: " + \
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
                        log("[CreateTodo VALIDATION] Failed due more than 1 match for Attribute: " + self._validatedRequest[key], "ERROR")
                        raise Exception(errorResponse)
            else:
                log("[CreateTodo VALIDATION] Failed due to required Attributes not present #2, required: " + \
                    str(self._requiredAttributes) + ", request: " + str(self._unvalidatedRequest), "INFO")
                raise Exception(errorResponse)
        log("[CreateTodo VALIDATION] Success" + str(self._validatedRequest), "INFO")

    def create(self):
        try:
            table = dynamodb.Table(self._tableName)

            payload = {                
                "id": str(uuid.uuid4()),
                "createdOn": datetime.datetime.today().strftime('%d/%m/%Y'),
                "userEmail": self._validatedRequest["userEmail"],
                "title": self._validatedRequest["title"],
                "description": self._validatedRequest["description"],
                "deadline": self._validatedRequest["deadline"],
                "priority": self._validatedRequest["priority"],
                "done": self._validatedRequest["done"]
            }

            response = table.put_item(
                Item=payload
            )
            log("[CreateTodo] Successful.", "INFO")

        except Exception as e:
            log("[CreateTodo] Failed.", "ERROR", e)
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Error interacting with DynamoDB",
                    "headers": HEADERS
                })
            )
            

def lambda_handler(event, context):
    req = RequestResponseProcessor(event)
    res = req.orchestrate()
    return res
    