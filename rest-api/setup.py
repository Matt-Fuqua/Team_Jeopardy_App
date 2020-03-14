import os
import mysql.connector 
import cs411_user
import cs411_db
from flask import Flask, request, render_template, jsonify, abort

app = Flask(__name__)
application = app

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
                    "Status":  Are they human being ('H') or an AI.  
                    "Account_Type":  Are they an admin ('A') or something else.
                    "UFirst_Name": Their first name.
                    "ULast_Name": Their last name.
                    "Email": Their email.
            401:
                description: User is not authenticated.  There is no error message or explanation given.
    """
    print(request.data)
    userRecord = cs411_user.validateLogin(request.form['username'], request.form['password'])
    if userRecord == None: abort(401)
    else: return jsonify(userRecord)

@app.route('/create', methods=['POST'])
def create():
    """ Create a new user -- Not Tested
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
    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
    #phase3()
    
