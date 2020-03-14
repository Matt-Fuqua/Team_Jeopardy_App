import os
import mysql.connector 
import cs411_user
import cs411_db
from flask import Flask, request, render_template, jsonify, abort

app = Flask(__name__)
application = app

# https://flask.palletsprojects.com/en/1.1.x/patterns/apierrors/
class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.route('/login', methods=['POST'])
def login():
    """ Authenticate users
    post:
        parameters:
            username
            password

        responses:
            200:
                description: User is authenticated
                schema:
                    "Create_Date":  The date their account was created.
                    "Account_Admin":  Are they an admin ('Y') or not ('N')
                    "UFirst_Name": Their first name.
                    "ULast_Name": Their last name.
                    "Email": Their email.
            401:
                description: User is not authenticated.  There is no error message or explanation given.
    """
    print(request.data)
    userRecord = cs411_user.validateLogin(request.form['username'], request.form['password'])
    if userRecord == None: raise InvalidUsage('Login failed', status_code=401)
    else: return jsonify(userRecord)

@app.route('/register', methods=['GET', 'POST'])
def register():
    """ Create a new user -- 
    post:
        parameters:
            username
            password
            Email
            UFirst_Name
            ULast_Name
        
    responses:
        200:
            description: User is created. Login record is returned. See /login.
        401:
            description: User creation failed.  There is no error message given.
    """
    (status, userRecord) = cs411_user.registerUser(
        request.form.get('username', 'USER NAME IS MISSING'),
        request.form.get('password', 'PASSWORD IS MISSING'),
        request.form.get('Email', 'EMAIL IS MISSING'),
        request.form.get('UFirst_Name', 'FIRST NAME IS MISSING'),
        request.form.get('ULast_Name', 'LAST NAME IS MISSING')
    )
    if status is False: raise InvalidUsage(userRecord["message"], 403)
    else: return jsonify(userRecord)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
    
