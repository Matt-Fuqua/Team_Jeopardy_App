import os
import mysql.connector 

def getConnection():
	db_user = os.environ.get('DB_USER')
	db_pass = os.environ.get('DB_PASS')
	db_db = os.environ.get('DB_DB')
	print("Logging in with user {0}".format(db_user))
	cnx = mysql.connector.connect(user=db_user, password=db_pass, database=db_db)
	return cnx 
