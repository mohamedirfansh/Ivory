import json
import requests

def lambda_handler(event, context):
    token = {'Authorization': event['headers']['Authorization'], 'Content-Type': 'application/json'}
    identity = event['headers']['id']
    data = {"isRead": True};

    response = requests.patch(f"https://graph.microsoft.com/v1.0/me/messages/{identity}", headers=token, json=data);

    print(response.content)

    return {
        'statusCode': json.dumps(response.status_code)
    }

print(lambda_handler({'headers' : {
    'Authorization' : 'Bearer EwCAA8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAYk4YIWR3X/3FI6URpNTJTUuC4qsIl4mskrQLSBfbu/4sn+0RNB9zFnggSzdYqO8+5N2EbSkLu/2sXxiUA7OOyTbc3Run3Ausk51uDOqDvzWuIiEkaNPhHQCOXoEHxzDd4XMoc4y2FSA9u78YvQ4PqiUEbUtPQIJh8uLHXkVA/7GYbIUeIows7axQoeg+E1QeEmjaMZ4J2BHI8CL+XZS3TDQca9qg4DgCBFJU1YqrHA9pHxXJejRHFg3nsjZN7c8C+7dGxlPqsqtIfQzmq85Dkr74cvuHFTJ/yLy4oq1xwzWP/v97fAorTfcFF08G3XEZzK9gYNV5s8NW3N9uaeVhRsDZgAACGL0emvppZ8OUALbOZyunq3DlI7ofRbOWGACwJSY5jmO284Qe8WPYBBca11VhwDTaqSQ31mQRb/7Hp/22HZGmOqVh99VVCZQQbkv94NOvEyofGXi0zUmGuq+BMCxuwSwwH6wo1QuL3GNjKhrYag/FrvjSWYDF1vqGRNSoX6ev2O2wXAZTNlrK0PQWCCNAQ0hZqowNxcqIlthYjsuBIqjg9E11bGR6S2A0+mqY0jdWF/Ccb1EoY6XHt1lqiZA430sjkEAKek0sv5sf87q0hjAqHLhJeZ/1vhAJjxnEZwYbUpYeBuAoLqK6VRepcO9GBL0Llv4FYOyLyAzlNnA1IG9Q0Sb+0b3YeaOR2H74J6gD+SJaGbw4FcvQMbwl6ZghOtbzZa9+PAt8046G2edGPo5+s2kAkJTGY3Ij/xMC4odhpclGi8jhj608NzsaAY9s/wgRTXdVS+Jeh+HOob/3jESopu3hVL0ABa87dkwv+MxLWla+JhAgtyU0BV7Wk0ILHdknDYqNMS6tdfZSx2jm5CYs2cjQEn3ONXQipzw75khIeOMi0zv6T/9SesKyOQcWgK0hbjJtSTIWY93nGHv29qBTQQk0gYzWd+6xessbHhaVpwWkcQNh1U6qWOhA8LgJwmuIuJwzXQWsyPCEirgPJWtbNt6zYHZVniyqUUBLuQs+jQvND45DH8++YI9o+DNTwGd5umXAqbBHEVgxp40XuGDKoBGM9HZh30/QJ3DPzVwIKNzgBvWNfuDJV3mClI/MbYlyyftjwvzKHgZsXrzqMz54K4ZTWzuXu07C4enmgI=', 
    'id': 'AQMkADAwATNiZmYAZC00Zjc5LTk0OTItMDACLTAwCgBGAAADv2Hvz9HFm0Wi4q-hrOYZSAcAXE2rz9z0AU2w7-hcEBmh3QAAAgEMAAAAXE2rz9z0AU2w7-hcEBmh3QAAAAHLKgcAAAA='}},
    'hi'))