import os
import mysql.connector 
from flask import Flask, request, render_template, jsonify
app = Flask(__name__)
application = app

score = 100

def getConnection():
	db_user = os.environ.get('DB_USER')
	db_pass = os.environ.get('DB_PASS')
	db_db = os.environ.get('DB_DB')

	cnx = mysql.connector.connect(user=db_user, password=db_pass, database=db_db)
	return cnx 

# This is a simple query we used for testing
@app.route("/test")
def hello():
    cnx = getConnection()
    cursor = cnx.cursor()
    fields = ["Question_ID", "Answer", "Round", "Question_Text", "Category", "Value", "Daily_Double", "Air_Date"]
    byteArray = [0, 0, 0, 0, 0, 0, 0, 0]
#   query = ("SELECT {0} FROM Question_Archive WHERE Value=score LIMIT 100").format( ",".join(fields) )
    query = ("SELECT * FROM Question_Archive WHERE Value={} LIMIT 100".format(score))
    cursor.execute(query)
    result = "<h1>dumb test</h1>\n"
    result += "<h2>random 100 rows</h2>\n"
    result += "<table><tr>"
    for f in fields:
    	result += "<th>{0}</th>".format(f)
    result += "</tr>"
    for tup in cursor:
    	result += "<tr>"
    	for i, f in enumerate(fields):
    		if byteArray[i]: result += "<td>" + tup[i].decode() + "</td>"
    		else: result += "<td>" + str(tup[i]) + "</td>"
    	result += "</tr>\n"
    cursor.close()
    cnx.close()
    result += "</table>"
    return result
 
# This is an example endpoint we used to satisfy requirements for phase 3.
# It calls a stored procedure that creates a new game from random categories and questions
@app.route("/phase3")
def phase3():
    cnx = getConnection()
    cursor = cnx.cursor()

    cursor.callproc('SP_Generate_Categories', [])
    # print results
    print("Printing laptop details")
    for result in cursor.stored_results():
            for r in result:
                resultId = r[0]
    
    query = ("SELECT Question_Text, Answer_Text, Category, Value, Round FROM Dev_Game_Questions WHERE Games_Game_ID={} LIMIT 100".format(resultId))
    cursor.execute(query)

    answers = {}
    # { "GAMES": [ {question: "This game has a queen and king", answer: "Chess"}, .... ]
    for tup in cursor:
        print(tup)
        (category, question, answer, value, rnd) = (tup[2].decode(), tup[0].decode(), tup[1].decode(), tup[3], tup[4].decode())
        t = {"question": question, "answer": answer, "round": rnd, "value": value}
        if category in answers: answers[category].append(t)
        else: answers[category] = [t]

    cursor.close()
    cnx.close()
    response = jsonify(answers)
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

# This is a query to get more detail from the Questions ARchive about the original quesiton
@app.route('/archive/<questionID>')
def archive(questionID):
    cnx = getConnection()
    cursor = cnx.cursor()

    fields = ["Answer", "Round", "Question_Text", "Category", "Value", "Daily_Double", "Air_Date"]
    string = [       1,      1,                1,          1,       0,              1,      0]

    cursor.execute("SELECT " + ", ".join(fields) + 
                   " FROM Question_Archive WHERE Question_ID = {0}".format(questionID))
    result = {}
    for tup in cursor:
        for i, f in enumerate(fields):
            if string[i]: result[f] = tup[i].decode()
            else: result[f] = tup[i]
    print(result) 
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# This is a query to get more detail from the Questions ARchive about the original quesiton
@app.route('/category/<categoryName>')
def category(categoryName):
    cnx = getConnection()
    cursor = cnx.cursor()

    fields = ["Answer", "Round", "Question_Text", "Category", "Value", "Daily_Double", "Air_Date"]
    string = [       1,      1,                1,          1,       0,              1,      0]

    cursor.execute("SELECT " + ", ".join(fields) + 
                   " FROM Question_Archive WHERE LCASE(category) LIKE \"%{0}%\"".format(categoryName))
    results = []
    
    for tup in cursor:
        result = {}
        for i, f in enumerate(fields):
            if string[i]: result[f] = tup[i].decode()
            else: result[f] = tup[i]
        results.append(result)
    response = jsonify(results)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
    #phase3()
    
