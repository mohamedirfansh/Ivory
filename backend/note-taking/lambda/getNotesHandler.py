import boto3
import json

S3_BUCKET_NAME = 'ivory-hackathon-g1'
s3_client = boto3.client('s3')


def lambda_handler(event, context):
    note_id = event['queryStringParameters']['noteid']
    file_content = s3_client.get_object(
        Bucket=S3_BUCKET_NAME,
        Key=f'notes/{note_id}',
    )["Body"].read()

    response_body = {
      'data': str(file_content)[1:]
    }
    
    return {
        'statusCode': 200,
        'body': json.dumps(response_body)
    }
