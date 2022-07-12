import json
import requests
import boto3
import base64
from botocore.exceptions import ClientError

client = boto3.client('dynamodb')
TABLE_NAME = 'Meetings'

def getTokenHeader(token):
    return {
        'accept': '*/*', 
        'accept-encoding': 'gzip, deflate, br', 
        'accept-language': 'en-US,en;q=0.9,la;q=0.8', 
        'Authorization': f'Bearer {token}', 
        'cache-control': 'no-cache', 
        'Host': 'm4cbv166x2.execute-api.ap-southeast-1.amazonaws.com', 
        'postman-token': 'c23fa27d-53f4-bbe6-8b67-304a2804159c', 
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"Windows"', 
        'sec-fetch-dest': 'empty', 
        'sec-fetch-mode': 'cors', 
        'sec-fetch-site': 'none', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36', 
        'X-Amzn-Trace-Id': 'Root=1-62cad8ef-26e0e03b5e93e991461e85da', 
        'X-Forwarded-For': '138.75.100.173', 
        'X-Forwarded-Port': '443', 
        'X-Forwarded-Proto': 'https'
    }

def get_secret():
    secret_name = "meetings/graphAPI/token"
    region_name = "ap-southeast-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    # In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
    # See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    # We rethrow the exception by default.

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'DecryptionFailureException':
            # Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InternalServiceErrorException':
            # An error occurred on the server side.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            # You provided an invalid value for a parameter.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            # You provided a parameter value that is not valid for the current state of the resource.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'ResourceNotFoundException':
            # We can't find the resource that you asked for.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
    else:
        # Decrypts secret using the associated KMS key.
        # Depending on whether the secret is a string or binary, one of these fields will be populated.
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
            return secret
        else:
            decoded_binary_secret = base64.b64decode(get_secret_value_response['SecretBinary'])
            return decoded_binary_secret


def lambda_handler(event, context):
    if 'headers' in event:
        token_header = event['headers']
        print(token)
    else:
        token = json.loads(get_secret())
        token_header = getTokenHeader(token['graphToken'])

    response = requests.get("https://graph.microsoft.com/v1.0/me/events", headers=token_header);
    content = response._content.decode("utf-8")

    data = json.loads(content)
    if 'value' not in data:
        return {
        'statusCode': 500,
        'body': 'Token Expired!',
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
        }
    }

    status = 200
    responseString = 'Meeting items added in DynamoDB'

    meetings = [meeting for meeting in data['value']]

    for meeting in meetings:
        meeting_id = meeting['id']
        meeting_subject = meeting['subject']
        meeting_start = meeting['start']['dateTime']
        meeting_end = meeting['end']['dateTime']
        meeting_location = meeting['location']['displayName']
        meeting_organizer = meeting['organizer']['emailAddress']['name']
        client.put_item(
            TableName=TABLE_NAME,
            Item={
                'MeetingId': {
                    'S': meeting_id
                },
                'Subject': {
                    'S': meeting_subject
                },
                'Start': {
                    'S': meeting_start
                },
                'End': {
                    'S': meeting_end
                },
                'Location': {
                    'S': meeting_location
                },
                'Organizer': {
                    'S': meeting_organizer
                }
            }
        )

    return {
        'statusCode': status,
        'body': json.dumps(responseString),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
        }
    }
