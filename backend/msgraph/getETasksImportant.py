import json
import requests

def lambda_handler(event, context):
    token = event['headers']
    
    # Get list id
    response = requests.get("https://graph.microsoft.com/v1.0/me/todo/lists/tasks", headers=token);
    content = json.loads(response._content.decode("utf-8"))
    todoTaskListId = content['id']

    # Get tasks
    response = requests.get(f"https://graph.microsoft.com/v1.0/me/todo/lists/{todoTaskListId}/tasks?$orderby=importance desc", headers=token);
    content = json.loads(response._content.decode("utf-8"))

    return {
        'statusCode': 200,
        'body': json.dumps(content['value'])
    }

print(lambda_handler({'headers' : {
    'Authorization' : 'Bearer '}}, 
    'hi'))