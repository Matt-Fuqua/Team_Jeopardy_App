import cs411_db
import flask

def validateLogin(username, password):
    """Returns None on failure, otherwise a dictionary of an authenticated user."""
    conn = cs411_db.getConnection()
    curs = conn.cursor()

    # This syntax prevents SQL injection attacks on username and password
    # TODO: Matt B change trigger to return these attributes instead of success/fail
    query = """SELECT Create_Date, Account_Admin, UFirst_Name, ULast_Name, Email
                 FROM Users
                WHERE Account_Active = 'Y' AND User_ID = %(username)s AND Password = %(password)s"""

    curs.execute(query, {"username": username, "password": password})
    result = curs.fetchone()

    if result is None: return None
    else:
        print(result)
        return {
            "Create_Date": result[0],
            "Account_Admin": result[1].decode(),
            "UFirst_Name": result[2].decode(),
            "ULast_Name": result[3].decode(),
            "Email": result[4].decode()
        }

def registerUser(username, password, email, first, last):
    """Returns a tuple (SuccessfulRegisteration, Dictionary).
        The first element of the tuple is False if registration failed for any reason.   The reason why is in the dictionary under key "message".
        The first element of the tuple is True if registration was successful.  The dictionary contains the authenticated user information.
    """
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
    if result[0] == 1: return (False, {"message": "User ID ``{0}'' not available".format(username)})

    # Check that the email is not alreay in use.
    query = """SELECT EXISTS(
                SELECT * 
                FROM Users
                WHERE LCASE(Email) = %(email)s
            ) AS usercheck"""
    curs.execute(query, {"email": email.lower()})
    result = curs.fetchone()
    if result[0] == 1: return (False, {"message": "Email ``{0}'' already used by another user.".format(email)})

    # Create the user
    curs.callproc("SP_Insert_Users", (username, password, first, last, email))
    curs.close()
    conn.commit()
    return (True, validateLogin(username, password))