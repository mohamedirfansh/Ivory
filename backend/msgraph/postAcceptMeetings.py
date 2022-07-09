import json
import requests

def lambda_handler(event, context):
    token = {'Authorization': event['headers']['Authorization']}
    identity = event['headers']['id']
    
    response = requests.post(f"https://graph.microsoft.com/v1.0/me/events/{identity}/accept", headers=token);

    return {
        'statusCode': json.dumps(response.status_code)
    }

print(lambda_handler({'headers' : {
    'Authorization' : 'Bearer EwCAA8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAbcuQAF/bSX3yoXA5rESGLNSUJyaNZ54lZoh27O8ePoDSplbQ4r4PGF+yuOTfi3v4pL0TAnn+uP/TscgP7YM7ZLHRPPXh2iaeRlOD6j0Vhgpd1LyOCXY5Y8StNOuRl5NnmSLLqlbzw6tfgm2btDU1ELyXPiqDPmaTON+wQIupBv+i/3m0U7ewa4ZNqxOBgXLyO9voNQPYX4fkOe8OihpECaXdTK8HLWavRJU4ZO/H7TDnG8hRd2a5jmEJWourfrQKmNuehx33L/P+qF3SMwzHQqrxGm+d8/uzGgkIk7WHwa8xmK9Axr/xnXTFBe/i0YZ+RHZkc7ej7lC4zWea5LI3QoDZgAACBU4wkbXJ0WEUAK8JE/RY4gbdUdfH9+8r02wHyJjQwsODe8Zg/9lZ6Rh6AFQA4msKWvsG70X/YSQ+1w7FYHSQkLxcfmFZ/Xs2HnZtEGmAxycIJYGEAFbckIbsGe4TTHJqAJEb7nIQgaz7/0dqasrTrH7TZYsl+P3uAIWZXSf37hTHBvZvEIlE7CRyvcfe8WqY4JQJOblJZ6zn+ieAuEIKOQh6T6LvL/ONdJEjiPaEcTDUud/nhEBMOwX3eyHvzPIZEjjIIHfxYMHo4lifSry9F/tPmC5mY72v1tYq6sZYonXZWHKI8lxMKqDc7n/olnF+IfpRH/3PRbRrd1BqErv84ToN0d8l76gt3pxPZU2T+5TT6ScfVTPl5+LdyeMweaVlK/tL6YzpMcsxo+koRMfyFopOubNrFIYiFEEnSuaYvcPo3s8Qyq5IL0x/s/RqYG85tqDq21s0pR4f6ssDu1mbgBPl55+Vq7f7+jRm5dyev8uDL3j81z1fMGXaKW6jXBYmYBj0V6TJLgu/LJsfqc0hVi3s5E7zWnMgz4ah49G768tjKsB2Qavy9u97gzEj1TPGkXIhraTnD71CaFXD2QEHJGG2TxeE7NnssT+ypK3pUvAVq7EtgiCkqV6ggqxG3ibpwmEIJ8rf2zoRAQaNjuRvjdOZnLLaJP0BZcRz6uClWqf66psyIjkfrkJoSgOgAOGtDnlU9/DcIBQpu78+bJcN4zUjFlWIv6FW4R0w/RUuoBM42/pvldpEpw8bZ2q6RDTiSSSeGyhjN7+B4/mzL79vx1lqCKO8nMPJbGDmgI=', 
    'id': 'AQMkADAwATNiZmYAZC00Zjc5LTk0OTItMDACLTAwCgBGAAADv2Hvz9HFm0Wi4q-hrOYZSAcAXE2rz9z0AU2w7-hcEBmh3QAAAgENAAAAXE2rz9z0AU2w7-hcEBmh3QAAAhUKAAAA'}},
    'hi'))