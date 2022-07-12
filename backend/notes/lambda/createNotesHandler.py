import json
import boto3

S3_BUCKET_NAME = 'ivory-hackathon-g1'
s3_client = boto3.client('s3')


def lambda_handler(event, context):
    request_body = event['body']
    request_body_json = json.loads(request_body)
    
    note_body = request_body_json['body']
    email = request_body_json['email']
    note_id = request_body_json['noteid']

    response = s3_client.put_object(
        Body=note_body,
        Bucket=S3_BUCKET_NAME,
        Key=f'notes/{email}/{note_id}'
    )
    print(str(response))
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
        }
    }
