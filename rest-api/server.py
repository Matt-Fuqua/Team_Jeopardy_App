from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    return 'Hello, World!'

@app.route('/users')
def get_users():
  return jsonify({'userId': 1,'firstName': 'Ryan', 'lastName': 'Fitch'})

app.run()