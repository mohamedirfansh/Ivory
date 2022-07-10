import json
import boto3
import requests

client = boto3.client('dynamodb')
TABLE_NAME = 'Meetings'

def lambda_handler(event, context):
    token = event['headers']
    
    response = requests.get("https://graph.microsoft.com/v1.0/me/events", headers=token);
    content = response._content.decode("utf-8")

    data = json.loads(content)
    if 'value' not in data:
        status = 500
        responseString = 'Token Expired!'
    else:
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
