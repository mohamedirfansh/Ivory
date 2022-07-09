import json
import requests

def lambda_handler(event, context):
    token = event['headers']
    
    response = requests.get("https://graph.microsoft.com/v1.0/me/messages?&filter=isRead eq false", headers=token);
    content = json.loads(response._content.decode("utf-8"))

    return {
        'statusCode': 200,
        'body': json.dumps(content['value'])
    }

print(lambda_handler({'headers' : {
    'Authorization' : 'Bearer EwCAA8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAUM5GUaAUyUsEumluDLXth21jETZqMRLB0Khxf81BqPX6NnL05+o7Rwre3IHoQtBs+C7g6rEx+RfoSunAAlEAZMNnIkf+wiGBIfWZfc6ROqLwsG6nSWSWKzgL16WxdB9/K9iecu5FgQKIGnJRpGDLeipswVdUbYlf4TCInHogEO1L0XgASH/FSlxvyJdwmiq5Q6avlmz4b6e4m76E+QQnsfuWRLsJrNIQ+L7VHvgG68To47IaBZgtlDuetvQWM3DXPTfjEnSYegkH/uWcnzF+icdmeKs21EMR5pC0bi3cB44FelNCl8n/mGr5WwOp8vxclOnAM5Yf1x1k2lJ5Jjaq5IDZgAACBO9BF32BKU8UAJEHjMoJuZbAq6MGx2pB2HjX2V0BBLED/IAZlRJgjIwB1HyoqQLEillVYBMHfnfQxqNba1fviFiE+AlyRH8jQ0xZajKs/kqIY4wrRCQtVL/k+SbPNSa09YwbsaLE7hM6bPu+ZJWqNsg1qv6UNTyvR45TGryFpa++/tAnX8EK9JsDwW0A3wh605b9FKPMk9jnx902FAd2lnHlmTQSTHlSgCo7vFrKt2hZeZidsKNWBD6Xwf+herVFk76KWYaCbvhZsrOKU1TNjCHPEhpensT2WTrSIJHApcJXMuUaPJiaEKy7GRb8qOV/RByo7h56r7xQSFQ6XoSQrrjcyBYGdSfd9xpQlBbirZSIsZFn3EZSFliRXaf9Jty79KmRrrCv+C9ZScAhh0As1KH5mFeFLwCmVYoAaZVZ3TY+yPapC7u9QrEZ0QI1OCkwXMoO4Gy+SkHbp1a4/I/65HhGd84H4sk2O2Isfewh9s7QJaReil3cvvmvP0mJViU0tY97klRjz2yRtf9LuPXDk6GvY83N2g9kJ9rbYmSCWbtiW76e+wjdZ7bTg+MOtkD9qfLSPQlqoVNpzM5kbMhZPD6mJJrWQX/T+QC7al4/C9cqts5kBrC+v16h0ht29Pj1YWkff8KXweyoupM00vTPlsgSnIRBP+se2ubO71G/x6urx3YARtX7zcELJy4rEmEInYMVc5J7pa+tdZRgtQjOuhp81bA2ga+/L0oyKp3RJIevyFGCLJf/d1doEriCvf3Sn3IUMPEgNfVEkT6uWBAJhJhiUFH6Gs4UZ+8mgI='}}, 
    'hi'))