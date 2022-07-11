from jira import JIRA
import boto3
from botocore.exceptions import ClientError
import json
import re
import datetime
import os

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
        self._unvalidatedRequest = event["queryStringParameters"]
        self._validatedRequest = {}
        self._regex = {
            "userEmail": r"^[a-zA-Z0-9.-_]{0,128}@[a-zA-Z0-9.-_]{0,127}$"
        }
        self._requiredAttributes = ["userEmail"]
        self._optionalAttributes = []
        self._jiraApiTokensTableName = os.environ["JIRA_API_TOKENS_TABLE_NAME"]
        self._secretName = ""
        self._region = ""
        self._jiraServer = ""
        self._jiraEmail = ""
        self._jiraApiToken = ""

    
    def orchestrate(self):
        '''
        Main orchestrating function
        '''
        self.validateRequest()
        self.getSecretNameAndRegion()
        self.getSecret()
        return self.get()

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
            log("[GetAllJiraIssues VALIDATION] Failed due to required Attributes not present #1, required: " + \
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
                        log("[GetAllJiraIssues VALIDATION] Failed due more than 1 match for Attribute: " + self._regex[key] + ". Found " + str(len(match)), "ERROR")
                        raise Exception(errorResponse)
            else:
                log("[GetAllJiraIssues VALIDATION] Failed due to required Attributes not present #2, required: " + \
                    str(self._requiredAttributes) + ", request: " + str(self._unvalidatedRequest), "ERROR")
                raise Exception(errorResponse)
        log("[GetAllJiraIssues VALIDATION] Success" + str(self._validatedRequest), "INFO")
        
    def getSecretNameAndRegion(self):
        # fetch secret name for Jira credentials from dynamodb
        try:
            table = dynamodb.Table(self._jiraApiTokensTableName)
            db_response = table.get_item(
                    Key={
                        "userEmail": self._validatedRequest["userEmail"]
                    }
                )
            self._secretName = db_response["Item"]["secretName"]
            self._region = db_response["Item"]["region"]
            log("[GetAllJiraIssues] Get secret name success.", "INFO")

        except Exception as e:
            log("[GetAllJiraIssues] Failed to get Jira secret name for email={email} with error: {err}"\
                    .format(email=self._validatedRequest["userEmail"], err=str(e)), "ERROR")
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Failed to get Jira secret name from database.",
                    "headers": HEADERS
                })
            )

    def getSecret(self):
        session = boto3.session.Session()
        sm_client = session.client(
            service_name='secretsmanager',
            region_name=self._region,
        )

        try:
            get_secret_value_response = sm_client.get_secret_value(
                SecretId=self._secretName
            )
            # Secrets Manager decrypts the secret value using the associated KMS CMK
            # Depending on whether the secret was a string or binary, only one of these fields will be populated
            if 'SecretString' in get_secret_value_response:
                creds = json.loads(get_secret_value_response['SecretString'])
                self._jiraServer = creds['server']
                self._jiraEmail = creds['email']
                self._jiraApiToken = creds['apiToken']

        except ClientError as e:
            errorMessage = ""
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                errorMessage = "The requested secret " + self._secretName + " was not found"
            elif e.response['Error']['Code'] == 'InvalidRequestException':
                errorMessage = "The request was invalid due to: " + str(e)
            elif e.response['Error']['Code'] == 'InvalidParameterException':
                errorMessage = "The request had invalid params: " + str(e)
            elif e.response['Error']['Code'] == 'DecryptionFailure':
                errorMessage = "The requested secret can't be decrypted using the provided KMS key: " + str(e)
            elif e.response['Error']['Code'] == 'InternalServiceError':
                errorMessage = "An error occurred on service side: " + str(e)
            else:
                errorMessage = "An unknown error occured: " + str(e)
            log(errorMessage, "ERROR")
            raise Exception(json.dumps({
                    "statusCode": 400,
                    "message": "Credentials fetch failed. " + errorMessage,
                    "headers": HEADERS
                })
            )

    def get(self):
        try:
            # Get a JIRA client instance
            jiraOptions = {'server': self._jiraServer}
            jira = JIRA(options=jiraOptions, basic_auth=(
                self._jiraEmail, self._jiraApiToken))
            
            # find all issues assigned to user & that is in an ongoing sprint
            currentIssues = []
            for issue in jira.search_issues("assignee = currentUser() and sprint in openSprints() " + \
                "and status not in (Closed, Resolved, Done) order by priority desc"):
                currentIssues.append(issue)

            issues = []
            for i in currentIssues:
                issues.append({
                    "key": i.key,
                    "summary": i.fields.summary,
                    "labels": i.fields.labels
                })

            log("[GetAllJiraIssues] Successful, Jira issues: " + str(issues), "INFO")
            return {
                "statusCode": 200,
                "body": json.dumps({
                    "issues": issues
                }),
                "headers": HEADERS
            }

        except Exception as e:
            log("[GetAllJiraIssues] Get failed for email={email} with error: {err}"\
                    .format(email=self._validatedRequest["userEmail"], err=str(e)), "ERROR")
            raise Exception(json.dumps({
                    "statusCode": 500,
                    "message": "Failed to get issues from Jira.",
                    "headers": HEADERS
                })
            )


def lambda_handler(event, context):
    req = RequestResponseProcessor(event)
    res = req.orchestrate()
    return res
    