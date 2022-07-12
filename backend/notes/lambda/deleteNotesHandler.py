import boto3
import json

S3_BUCKET_NAME = 'ivory-hackathon-g1'
s3_client = boto3.client('s3')


def lambda_handler(event, context):
    user_email = event['queryStringParameters']['useremail']
    note_id = event['queryStringParameters']['noteid']

    response = s3_client.delete_object(
      Bucket=S3_BUCKET_NAME,
      Key=f'notes/{user_email}/{note_id}.json'
    )
    print(str(response))
    return {
        'statusCode': 200,
        'body': json.dumps(note_id), 
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
        }
    }
