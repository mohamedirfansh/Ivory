import boto3
import json

S3_BUCKET_NAME = 'ivory-hackathon-g1'
s3_client = boto3.client('s3')


def lambda_handler(event, context):
    user_email = event['queryStringParameters']['useremail']
    
    response = s3_client.list_objects(
        Bucket=S3_BUCKET_NAME,
        Prefix=f'notes/{user_email}'
    )
    
    notes = response['Contents']
    note_ids = [note['Key'] for note in notes]
    
    return {
        'statusCode': 200,
        'body': json.dumps(note_ids),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }
