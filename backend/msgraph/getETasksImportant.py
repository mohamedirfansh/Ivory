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
    'Authorization' : 'Bearer EwCAA8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAQRgTIQXXbFv2RAgBfS/glcQHd+RzPyhvAY35zv1GuFmh+0NKuM0ZJdkNZt1nQK7eHOvunMTp05uwAlLY5L1ihF4603iPtTgauPutC/LSEBtGA6MJ+NmdCkheA8DLSXWiWOYg91OHIPprHswDK3xXiaEMMT9VomiJPlQGYe2MN0C7Fn72HIgL5Ie8GigWUc53iYpmXTW1NOxKvpX+Qwqy1JiLmjhcz9DDQC5Qf94XQdrDsHFMkWwMzm8l7Dgms6VBU4OmUXrznKgEfHANa2cCQZIkVreFwBdVSP+m+5uFuUps/WAi1BMC7jXvdKBxVcy1an3T+Y8IOyVzChCHM+1p5MDZgAACFQpAsDq8K4BUAIZ1wlKNDYWAzg9nmbkr1Z2iZ0s4vRnBxI1b7BqmGvHYtZ655qa4Kg0vpMds/Ue+rCw6vg+7HkGDZdwyvcA3DlMzPIgt3q28xTcjB8PCcknfnQpFH1Ay289ebruJLgQdHZhWrKo5eWm2MRufL9dlU4M+yBRyCVoyIibgEQJeSagtVac4+ju602NFW66jHKDof/qr4gspsbdqY/cZHJKyGUwe9IXo07Y7wFn3uuLKCN9kcqchb6yRwHOhtmcp8qn5eEs6wCXUmvFF9F0Rvz1xGc9LuqeersRUBFweKwtNcZ/xykfHmW61md6phwZC127IrFmbLqJU4VAaa2ZXRrmAYYJwDA+CbeoDnZfv1SLB4UedsdfPoCdjHDH6vj/4l8zZSMS6WAGhgILcM0tCmyxvRC2+uSFaaTT6KDH6L4AKMxboJwoAClfjggC4UcU3CTYGIKhK0vKihpFYIXPpw49ZoRUGe9GIlBBmJNGotfCnw/AA0fbRfyIeW5NwiQoOEmUrxQip+rQmnGfaZa5Znc6tcL78+3XXyEjFtMRCAmQyERq0YF+xOHc/C1TFHbmpJVmQQImGhlDXhRGtSPygINtLec6PCL6hnQt7vH24p/285PyxzUpka749PL2Dm2gBWnMkHsWKL7oFhlkLYn9/bXeuM8cL6aW/ekVcIo4q1PLScV2c86ToIG2CI8mx+bU0ZJsOVHbd2nxfkBo2evLnA/LAaLI8gZz4+d9d8mIPnHHdYC9VZk1z/0EAHTcuyFZH+OwjSdiCk3E+YKSvgVsPX+Th8ZLmgI='}}, 
    'hi'))