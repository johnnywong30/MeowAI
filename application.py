from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
# from dotenv import load_dotenv
import os
import openai

# load_dotenv()

application = Flask(__name__,
            # static_folder='client/dist',
            )

CORS(application)

openai.api_key = os.getenv("OPENAI_API_KEY")

chat_history = [{"role": "system", "content": "You are a helpful assistant."}]

@application.route("/history", methods=['GET'])
def history():
    return jsonify(chat_history), 200

@application.route("/chat", methods=['POST'])
def chat():
    '''
    request should be in the form of
    {
        user_message: <USER MESSAGE>
    }
    '''
    req = request.get_json()
    model="gpt-3.5-turbo"
    msg = req['user_message'].strip()
    print(f'User message: {msg}')
    
    chat_history.append({"role": "user", "content": msg},)
    chat_response = openai.ChatCompletion.create(
        model=model,
        messages=chat_history
    )
    reply = chat_response['choices'][0]['message']
    chat_history.append(reply)
    response = {
        "chat_msg": reply['content']
    }
    return jsonify(response), 200

@application.route("/classify", methods=['POST'])
def classify():
    '''
    request should be in the form of
    {
        user_message: <USER MESSAGE>
    }
    '''
    req = request.get_json()
    model="gpt-3.5-turbo"
    msg = req['user_message'].strip()
    classification = req['classification'].strip()
    msg = "Classify the sentiment of the following message into " + classification + ": " + msg
    print(f'User message: {msg}')
    
    chat_history.append({"role": "user", "content": msg},)
    chat_response = openai.ChatCompletion.create(
        model=model,
        messages=chat_history
    )
    reply = chat_response['choices'][0]['message']
    chat_history.append(reply)
    response = {
        "chat_msg": reply['content']
    }
    return jsonify(response), 200

@application.route("/code", methods=['POST'])
def code():
    '''
    request should be in the form of
    {
        user_message: <USER MESSAGE>
    }
    '''
    req = request.get_json()
    model="gpt-3.5-turbo"
    msg = req['user_message'].strip()
    language = req['language'].strip()
    msg = "In " + language + " code the following: " + msg
    print(f'User message: {msg}')
    
    chat_history.append({"role": "user", "content": msg},)
    chat_response = openai.ChatCompletion.create(
        model=model,
        messages=chat_history
    )
    reply = chat_response['choices'][0]['message']
    chat_history.append(reply)
    response = {
        "chat_msg": reply['content']
    }
    return jsonify(response), 200

@application.route("/image", methods=['POST'])
def generate_image():
    '''
    request should be in the form of
    {
        image_prompt: <IMAGE PROMPT>
    }
    '''
    req = request.get_json()
    msg = req['image_prompt'].strip()
    print(f'Image prompt: {msg}')
    
    image_response = openai.Image.create(
        prompt=msg,
        n=1,
        size="1024x1024"
    )
    reply = image_response['data'][0]['url']
    response = {
        "image_response": reply
    }
    return jsonify(response), 200


# Serve React App
@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def root(path):
    # if path != "" and os.path.exists(application.static_folder + '/' + path):
    #     return send_from_directory(application.static_folder, path)
    # else:
    #     return send_from_directory(application.static_folder, 'index.html')
    return 'hi'

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run(port=8000)
    