import cs411_db
import flask

def validateLogin(username, password):
    conn = cs411_db.getConnection()
    curs = conn.cursor()

    # This syntax prevents SQL injection attacks on username and password
    # TODO: Matt B change trigger to return these attributes instead of success/fail
    query = """SELECT Create_Date, Status, Account_Type, UFirst_Name, ULast_Name, Email
                 FROM Users
                WHERE User_ID = %(username)s AND Password = %(password)s"""

    curs.execute(query, {"username": username, "password": password})
    result = curs.fetchone()

    if result is None: return None
    else:
        print(result)
        return {
            "Create_Date": result[0],
            "Status": result[1].decode(),
            "Account_Type": result[2].decode(),
            "UFirst_Name": result[3].decode(),
            "ULast_Name": result[4].decode(),
            "Email": result[5].decode()
        }

def registerUser(username, password, email, first, last):
    conn = cs411_db.getConnection()
    curs = conn.cursor()

    # Check that the user name is not already taken.
    query = """SELECT EXISTS(
                SELECT * 
                FROM Users
                WHERE LCASE(User_ID) = %(username)s
            ) AS usercheck"""
    curs.execute(query, {"username": username.lower()})
    result = curs.fetchone()
    if result[0] == 1: return (None, {"message": "User ID %(username)s not available".format(username)})

    # Check that the email is not alreay in use.
    query = """SELECT EXISTS(
                SELECT * 
                FROM Users
                WHERE LCASE(Email) = %(email)s
            ) AS usercheck"""
    curs.execute(query, {"email": email.lower()})
    result = curs.fetchone()
    if result[0] == 1: return (None, {"message": "Email %(email)s already used by another user.".format(username)})

    # Create the user
    query = """CALL SP_Insert_Users(%(username)s, %(password)s, '?', '?', %(first)s, %(last)s, %(email)s)"""
    curs.execute(query, {
        "username": username,
        "password": password,
        "first": first,
        "last": last,
        "email": email})
    result = curs.fetchone()
    
    return result[0]

