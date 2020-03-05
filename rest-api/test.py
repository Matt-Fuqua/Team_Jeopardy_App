import os
import mysql.connector 
from flask import Flask, request, render_template
app = Flask(__name__)
application = app

score = 100

def getConnection():
	db_user = os.environ.get('DB_USER')
	db_pass = os.environ.get('DB_PASS')
	db_db = os.environ.get('DB_DB')

	cnx = mysql.connector.connect(user=db_user, password=db_pass, database=db_db)
	return cnx 
 
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
    
    query = ("SELECT * FROM Dev_Game_Questions WHERE Games_Game_ID={} LIMIT 100".format(resultId))
    cursor.execute(query)
    for tup in cursor:
        
     


if __name__ == "__main__":
	# app.run(host='0.0.0.0', port=5001)
    phase3()
    
