from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import openai

load_dotenv()

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

chat_history = [{"role": "system", "content": "You are a helpful assistant."}]

@app.route("/history", methods=['GET'])
def history():
    return jsonify(chat_history), 200

@app.route("/chat", methods=['POST'])
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


@app.route("/")
def hello_world():
    return f'<p>hi</p>'

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run(host='localhost', port=8000)