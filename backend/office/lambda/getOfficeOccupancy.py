import json
import boto3

client = boto3.client('dynamodb')
TABLE_NAME = 'OfficeOccupancy'

def lambda_handler(event, context):
    response = client.scan(
        TableName=TABLE_NAME,
        Select='ALL_ATTRIBUTES',
        Limit=7
    )

    print(response['Items'])
    
    return {
        'statusCode': 200,
        'body': json.dumps(response['Items']),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
        }
    }
