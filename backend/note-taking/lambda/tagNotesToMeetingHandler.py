import json
import boto3

client = boto3.client('dynamodb')
TABLE_NAME = 'Meetings'

def lambda_handler(event, context):
    request_body = event['body']
    request_body_json = json.loads(request_body)

    user_email = request_body_json['useremail']
    note_id = request_body_json['noteid']
    meeting_id = request_body_json['meetingid']

    response = client.update_item(
        TableName=TABLE_NAME,
        Key={
            'MeetingId': {
                'S': meeting_id
            }
        },
        UpdateExpression=f'SET NoteId=:NoteId, UserEmail=:UserEmail',
        ExpressionAttributeValues={
            ':NoteId': {'S': note_id},
            ':UserEmail': {'S': user_email}
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps('Note tagged successfully!'),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
        }
    }
