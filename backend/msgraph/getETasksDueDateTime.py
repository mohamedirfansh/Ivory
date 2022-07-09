import json
import requests

def lambda_handler(event, context):
    token = event['headers']
    
    # Get list id
    response = requests.get("https://graph.microsoft.com/v1.0/me/todo/lists/tasks", headers=token);
    content = json.loads(response._content.decode("utf-8"))
    todoTaskListId = content['id']

    # Get tasks
    response = requests.get(f"https://graph.microsoft.com/v1.0/me/todo/lists/{todoTaskListId}/tasks?$orderby=dueDateTime/dateTime", headers=token);
    content = json.loads(response._content.decode("utf-8"))

    return {
        'statusCode': 200,
        'body': json.dumps(content['value'])
    }

print(lambda_handler({'headers' : {
    'Authorization' : 'Bearer EwCAA8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AATDmJEk+Y8dcmxGBIE3eGENs3UAuFiMP8NraOOSp4EF99bdSsm/EiIwA5IoUurI3iECsD9bAi3HWmNpx9Lx1zZ6XnvCO/AcbocyUYpFfcj36VfCSxDjRB6TWsV+8bXhR5CsgnobkFrUbOmplNGaa+8Luqhf4zYfAlz9ivmi1TsB42uCdDDvYCD2EiWGQAiNhYy6W+qn0RpHHgsWsThlaWgjB+usoTr75Mmc9riexPv64jmZDW6X05iqV2LUgp4Wo+iiVkXep0Ox9ADjsLOalqKHUCvFpUFa1/loALft3588p1eyuG9ZZNL4ghqFUI4YmqY11RkC104HtpCjFqeywbiYDZgAACJKmq7Bx0xsdUAKb7hv15XvwZl3c0Go6qqnaefhvV3RYx+05jGs7SlDxUTuA9G4CvGoS3+a1DtKfJnsMvwqzqh0V39EG4MxsUZpZuPEb8wtitizSKP/SraCQSXuyrtgkyOg4UnceazRSEBjYm2luJNxC4RRyn3y0RwErMIQtcwD9kB09+r8DRylOblFtDj7AxTetGx48OqWAD6hbnrsPHmwja2N4CBDHx5fL9pscaGhT78/uFj5GtaaWyXKhWiDgh4UoM5K8troOE7SGIJFGRomZus1VmncbUpM/JYND7+nBbMGJxQnbE0yvg4QBqcrNajEVO8yzdBtpzewkKI51rfPvVTURHcsxXrMfPsbd0BfgwHraJmgDSSZxRA20wj+0qsXC0ykYq+AKcY2WppkujerY5xeU6sNggoTv5YnG2c0It1ak4uLZwqzqGf/a7wsqII1u6NKVUVDSRnXZpJhsz/TbPPRc2DanCo7H84DrrjyjAlPYIzEXrGVKQKPH+4r2qT44x0HLGf/jOvEL1Ko5fbMPmGCBm8az/UH+xLkK+1gbhYpK60r1y06B2e5Kynb84+6jBb6ZnREsAHHhll3UWHXSsQKzwHRrwBRSVwHonNniqn9twqFkg9TxLqBQ5ResdylzDFORTNggJG3CeEfZwiMXqSvVvThBYLcyy6zbGgmlj+wuUjryctXwkhgFmNkp58pYOcrQh+21AufKQYGOc65o38gLsmHY7HDQOXdFx1yzhZdgl5nsRMFdq9SYNCnSZTT2PQuMGe/kk5iAk1LBbSKyLUA9WIViTXGMmgI='}}, 
    'hi'))