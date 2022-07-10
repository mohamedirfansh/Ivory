
import boto3
import json
import re
import datetime
import os

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
        self._unvalidatedRequest = event['queryStringParameters']
        self._validatedRequest = {}
        self._regex = {
            "userEmail": r"^[ a-zA-Z0-9]{0,128}@[ a-zA-Z0-9.-]{0,127}$"
        }
        self._requiredAttributes = ["userEmail"]
        self._optionalAttributes = []
        self._tableName = os.environ["TODOS_TABLE_NAME"]
    
    def orchestrate(self):
        '''
        Main orchestrating function
        '''
        self.validateRequest()
        return self.get()

    def validateRequest(self):
        '''
        Code for validating requests
        '''
        # predefining errorResponse
        errorResponse = json.dumps({
            "statusCode": 400,
            "message": "Validation failed."
        })
        # ensure unvalidated request contains all required attributes
        if not set(self._requiredAttributes).issubset(set(self._unvalidatedRequest.keys())):
            log("[GetAllTodos VALIDATION] Failed due to required Attributes not present #1, required: " + \
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
                        log("[GetAllTodos VALIDATION] Failed due more than 1 match for Attribute: " + self._validatedRequest[key], "ERROR")
                        raise Exception(errorResponse)
            else:
                log("[GetAllTodos VALIDATION] Failed due to required Attributes not present #2, required: " + \
                    str(self._requiredAttributes) + ", request: " + str(self._unvalidatedRequest), "ERROR")
                raise Exception(errorResponse)
        log("[GetAllTodos VALIDATION] Success" + str(self._validatedRequest), "INFO")
        
    def get(self):
        try:
            table = dynamodb.Table(self._tableName)

            db_response = table.query(
                KeyConditionExpression="userEmail=:userEmail",
                ExpressionAttributeValues= {
                    ":userEmail": self._validatedRequest["userEmail"]
                }
                # ProjectionExpression="title, createdOn, deadline, done, priority"
            )
            todos = db_response["Items"]
                            
            log("[GetAllTodos] Successful, todo: " + str(todos), "INFO")
            return {
                "statusCode": 200,
                "body": json.dumps({
                    "todos": todos
                }),
                "headers": {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                }
            }

        except Exception as e:
            log("[GetAllTodos] Get failed for user with email={email} with error: {err}"\
                    .format(email=self._validatedRequest["userEmail"], err=str(e)), "ERROR")
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Failed to get todos from database."
                })
            )
            

def lambda_handler(event, context):
    req = RequestResponseProcessor(event)
    res = req.orchestrate()
    return res
    
    