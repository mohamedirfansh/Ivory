import json
import requests

def lambda_handler(event, context):
    token = {'Authorization': event['headers']['Authorization']}
    identity = event['headers']['id']
    
    response = requests.post(f"https://graph.microsoft.com/v1.0/me/events/{identity}/decline", headers=token);

    return {
        'statusCode': json.dumps(response.status_code)
    }

print(lambda_handler({'headers' : {
    'Authorization' : 'Bearer ', 
    'id': ''}},
    'hi'))