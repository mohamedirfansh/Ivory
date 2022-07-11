
import boto3
from dynamodb_encryption_sdk.encrypted.table import EncryptedTable
from dynamodb_encryption_sdk.identifiers import CryptoAction
from dynamodb_encryption_sdk.material_providers.aws_kms import AwsKmsCryptographicMaterialsProvider
from dynamodb_encryption_sdk.structures import AttributeActions
import json
import re
import datetime
import os

HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
}


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
            "userEmail": r"^[a-zA-Z0-9.-_]{0,128}@[a-zA-Z0-9.-_]{0,127}$",
            "jiraServer": r"^[a-zA-Z0-9/:-]{0,256}.atlassian.net[/]{0,1}$",
            "jiraEmail": r"^[a-zA-Z0-9.-_]{0,128}@[a-zA-Z0-9.-_]{0,127}$",
            "jiraApiToken": r"^[\S]{0,256}$"
        }
        self._requiredAttributes = ["userEmail", "jiraServer", "jiraEmail", "jiraApiToken"]
        self._optionalAttributes = []
        self._tableName = os.environ["JIRA_USERS_TABLE_NAME"]
        self._cmkId = os.environ["DYNAMODB_JIRA_USERS_KEY_ID"]

    
    def orchestrate(self):
        '''
        Main orchestrating function
        '''
        self.validateRequest()
        encryptedTable = self.getEncryptedTable()
        self.put(encryptedTable)
        return {
            "statusCode": 200,
            "body": json.dumps("Success"),
            "headers": HEADERS
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
            log("[StoreJiraCredentials VALIDATION] Failed due to required Attributes not present #1, required: " + \
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
                        log("[StoreJiraCredentials VALIDATION] Failed due more than 1 match for Attribute: " + key + ". Found " + str(len(match)), "ERROR")
                        raise Exception(errorResponse)
            else:
                log("[StoreJiraCredentials VALIDATION] Failed due to required Attributes not present #2, required: " + \
                    str(self._requiredAttributes) + ", request: " + str(self._unvalidatedRequest), "ERROR")
                raise Exception(errorResponse)
        log("[StoreJiraCredentials VALIDATION] Success", "INFO")

    def getEncryptedTable(self):
        try:
            aws_cmk_cmp = AwsKmsCryptographicMaterialsProvider(key_id=self._cmkId)
            actions = AttributeActions(
                default_action=CryptoAction.ENCRYPT_AND_SIGN
            )

            table = boto3.resource('dynamodb').Table(self._tableName)
            encrypted_table = EncryptedTable(
                table=table,
                materials_provider=aws_cmk_cmp,
                attribute_actions=actions
            )

            log("[StoreJiraCredentials] Instantiation of encrypted table successful.", "INFO")
            return encrypted_table

        except Exception as e:
            log("[StoreJiraCredentials] Getting encrypted table failed with error: {err}"\
                    .format(err=str(e)), "ERROR")
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Failed to get encrypted table.",
                    "headers": HEADERS
                })
            )

    def put(self, encryptedTable):
        try:
            # delete existing entry, if any
            encryptedTable.delete_item(
                Key={
                    "userEmail": self._validatedRequest["userEmail"]
                }
            )

            # put current entry
            payload = {
                "userEmail": self._validatedRequest["userEmail"],
                "jiraServer": self._validatedRequest["jiraServer"],
                "jiraEmail": self._validatedRequest["jiraEmail"],
                "encApiToken": self._validatedRequest["jiraApiToken"]
            }
            response = encryptedTable.put_item(
                Item=payload
            )
            log("[StoreJiraCredentials] Successful.", "INFO")

        except Exception as e:
            log("[StoreJiraCredentials] Put Jira creds to dynamodb failed for email={email} with error: {err}"\
                    .format(email=self._validatedRequest["userEmail"], err=str(e)), "ERROR")
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Failed to put in DynamoDB.",
                    "headers": HEADERS
                })
            )


def lambda_handler(event, context):
    req = RequestResponseProcessor(event)
    res = req.orchestrate()
    return res
    