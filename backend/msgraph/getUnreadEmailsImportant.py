import json
import requests

def lambda_handler(event, context):
    token = event['headers']
    
    response = requests.get("https://graph.microsoft.com/v1.0/me/messages?&filter=isRead eq false&orderby=importance desc", headers=token);
    content = response._content.decode("utf-8")

    return {
        'statusCode': 200,
        'body': json.dumps(content),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,OPTIONS,POST,GET'
        }
    }