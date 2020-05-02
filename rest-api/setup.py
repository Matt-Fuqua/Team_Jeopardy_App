import os
import mysql.connector 
import cs411_dash
import cs411_user
import cs411_db
import cs411_answers
import cs411_game
from flask import Flask, request, render_template, jsonify, abort
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

def prepJSON(adict):
    response = jsonify(adict)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Origin,Content-Type,Authorization,X-Auth-Token')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

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
    response = prepJSON(error.to_dict())
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
    userRecord = cs411_user.validateLogin(request.form['username'], request.form['password'])
    if userRecord == None: raise InvalidUsage('Login failed', status_code=401)
    else: return prepJSON(userRecord)

@app.route('/password', methods=['POST'])
def password():
    """ Authenticate users
    post:
        parameters:
            username
            password
            newpassword

        responses:
            200:
                description: password was changed successfully
            401:
                description: password change failed.
                could be user ID doesnt exist or that current password was wrong
    """
    changed = cs411_user.changePassword(request.form['username'], 
        request.form['password'],
        request.form['newpassword'])
    if (changed == 1): return prepJSON({"message": "success"})
    else: raise InvalidUsage('Password Change Failed', status_code = 401)

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
    else: return prepJSON(userRecord)

@app.route('/randomAnswer', methods=['GET'])
def randomAnswer():
    return prepJSON(cs411_answers.randomAnswer())

@app.route('/checkQuestion/<questionID>', methods=['GET'])
def checkAnswer(questionID):
    """This is a debug routine. Front shouldn't need except for debugging. """
    questionGuess = request.args.get('questionGuess', 'FORM ERROR')
    print("{0} {1}".format(questionID, questionGuess))
    return prepJSON(cs411_answers.checkAnswer(questionID, questionGuess))

@app.route('/submitAnswer', methods=['POST'])
def submitAnswer():
    """Submits the guessed answer for a given game, question, contestant. 
        post:

        parameters:
            Games_Game_ID
            GameQuestions_ID
            Contestant_Coontestant_ID
            questionGuess

    Return a dictionary containing:
        responses:
        200:
            description: The question is answered.
            schema:
                Games_Game_ID: The ID of the Game.  (You passed this in)
                GameQuestions_ID:  The ID of the Question asked.  (You passed this in)
                Contestant_Contestant_ID: The ID of the Contestant. (You passed this in)
                CorrecAnswer: The actual correct question according to the archives.
                ConsideredCorrect: a Y or N that if the question is considered correct.
        401:
            description: The write to the database failed for some reason.
            schema:
                status: The status code returned from the database
                message: A helpful diagnostic text message.
    """
    result = cs411_answers.submitAnswer(
        request.form.get('Games_Game_ID'),
        request.form.get('GameQuestions_ID'),
        request.form.get('Contestant_Coontestant_ID'),
        request.form.get('questionGuess')
    )
    if result["status"] != 1: raise InvalidUsage(result["message"], 403)
    else: return prepJSON(result)

@app.route('/game/new', methods=['POST'])
def newGame():
    """ Create a new game --
    post:
        No arguments.  In the future will require user ID and potentially other fields.
    responses:
        200:
            description:  A game is created.   A dictionary of the form 
                { "Games_Game_ID" :  integer,
                  "Contestants": [id1, id2, ..]
                  "Answers":  { **phase3_output** }
                }

        Contestants is a list of the contestant IDs playing the game.  By convention, the ID
         1000 is reserved for A.I. players.
        See /game/<gameID> documentaiton for explanation of *phase3_output*
    """
    result = cs411_game.newGame()
    return prepJSON(result)

@app.route('/game/<gameID>', methods=['GET'])
def retrieveGame(gameID):
    """ Returns the Answers object for a specific game ID.
    responses:
        200:
            {
                "Games_Game_ID":  The ID of the Game,
                "round1": [ { "category": "....", "questions": [ ... ] } ]
                "round2": [ { "category": "....", "questions": [ ... ] } ]
                "final":  [ { "category": "....", "questions": [ . ] } ]            
            }
            
            each 
    """
    result = cs411_game.getQuestions(gameID)
    return prepJSON(result)

@app.route('/games', methods=['GET'])
def retrieveGames():
    """Returns a complete dump of the Games relation.
    responses:
        200:
            {
                "Game_ID": The ID of the game,
                "Gamescol": I have no idea,
                "Game_Date": The creation date of the game,
                "Game_End_Date" The conclusion of the game, or NULL if in progress
                "Contestants_Contestant_ID_Winner": The winning Contestant_ID of the game
                "GameCreation_Type": unused
                "GameCreation_Options": unused
            }
    """
    result = cs411_game.getGames()
    return prepJSON(result)

@app.route('/games/delete', methods=['GET'])
def deleteCandidates():
    """Returns a list of the games that can be deleted due to abandonment.
    respnses:
        200:
            [
                {
                    "Game_ID": The id of the game,
                    "Game_Date": The date of the game creation
                },
                {...},
                {...}
            ]"""
    return prepJSON(cs411_game.getProposedDeletes())

@app.route('/games/delete/abandoned', methods=['POST'])
def executeDeleteCandidates():
    """Deletes abandonded games.
    responses:
        200:
            {
                "message": Success,
                "gamesDeleted": Number of games deleted
            }
    """
    return prepJSON(cs411_game.executeDeletions())

@app.route('/game/fakefinish', methods = ['POST'])
def fakeFinish():
    """Simulates random contestant winning the game to demonstrate how the schema
    handles game-end events.

    post:
        "Game_ID":  The ID of the game to simualte

    responses:
        200: { "message" : "success" }
        403: { "message" : "failure" }
    """
    result = cs411_game.fakeUpdate(request.form.get('Game_ID'))
    if result == 1: return prepJSON({"message": "success"})
    else: raise InvalidUsage(result["message"], 403)

@app.route('/category/easy', methods = ['GET'])
def easyCategory():
    """Returns the top 10 easy categories.

    responses:
        200: { "category1...": nnn, "category2...": nnn}
    """
    return prepJSON(cs411_dash.easyCategory())

@app.route('/category/tough', methods = ['GET'])
def toughCategory():
    """Returns the top 10 easy categories.

    responses:
        200: { "category1...": nnn, "category2...": nnn}
    """
    return prepJSON(cs411_dash.toughCategory())

@app.route('/contestant/rich', methods = ['GET'])
def richContestants():
    """Returns the top 10 rich contestants.

    responses:
        200: { "contestant_1...": nnn, "contestant_2...": nnn}
    """
    return prepJSON(cs411_dash.richContestants())

@app.route('/contestant/smart', methods = ['GET'])
def smartContestants():
    """Returns the top 10 smart contestants.

    responses:
        200: { "contestant_1...": nnn, "contestant_2...": nnn}
    """
    return prepJSON(cs411_dash.smartContestants())

@app.route('/contestant/dumb', methods = ['GET'])
def dumbContestants():
    """Returns the top 10 dumb contestants.

    responses:
        200: { "contestant_1...": nnn, "contestant_2...": nnn}
    """
    return prepJSON(cs411_dash.dumbContestants())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
    