import requests

url = 'https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/notes/audio'

def main():
    with open('./audio_note.mp3', 'rb') as audio_note:
        response = requests.post(url, files={'fieldname': audio_note})
        print(response)
  

if __name__ == '__main__':
    main()