import json
import boto3

client = boto3.client('dynamodb')
TABLE_NAME = 'Meetings'

def lambda_handler(event, context):
    user_email = event['queryStringParameters']['useremail']

    response = client.query(
        TableName=TABLE_NAME,
        IndexName='UserEmail-index',
        KeyConditionExpression='UserEmail=:UserEmail',
        ExpressionAttributeValues={
            ':UserEmail': {'S': user_email}
        }
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
