import cs411_db

# Create a new game
def newGame():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()

    cursor.callproc('SP_Generate_Categories_PROD', [])
    for result in cursor.stored_results():
            for r in result:
                resultId = r[0]
    cursor.close()
    cnx.commit()
    cnx.close()

    # Randomly select 3 contestants to play in the game
    # In the future, front-end should provide this
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()
    query = """INSERT INTO Game_Contestants (Games_Game_ID, Contestants_Contestant_ID)
                SELECT {0} AS Games_Game_ID, Contestant_ID AS Contestants_Contestant_ID
                  FROM Contestants
                 WHERE Contestant_ID = 1000""".format(resultId)
    cursor.execute(query)
    cursor.close()
    cnx.commit()

    cursor = cnx.cursor()
    query = """INSERT INTO Game_Contestants (Games_Game_ID, Contestants_Contestant_ID)
                SELECT {0} AS Games_Game_ID, Contestant_ID AS Contestants_Contestant_ID
                  FROM Contestants
                 ORDER BY RAND()
                 LIMIT 1""".format(resultId)
    cursor.execute(query)
    cursor.close()
    cnx.commit()

    cursor = cnx.cursor()
    query = """SELECT Contestants_Contestant_ID
                 FROM Game_Contestants
                WHERE Games_Game_ID = {0}""".format(resultId)
    cursor.execute(query)
    results = []
    for row in cursor:
        results.append(row[0])
    cnx.close()

    gQ = getQuestions(resultId)
    gQ["Contestants"] = results
    return gQ

# Exposes a read-only view of the Games table
def getGames():
    conn = cs411_db.getConnection()
    cursor = conn.cursor()
    
    query = ("""SELECT Game_ID, Gamescol, Game_Date, Game_End_Date, 
        Contestants_Contestant_ID_Winner, GameCreation_Type, GameCreation_Options
        FROM Games""")
    cursor.execute(query)
    results = []
    for game in cursor:
        gameDict = { "Game_ID": game[0],
                     "Gamescol": game[1],
                     "Game_Date": game[2],
                     "Game_End_Date": game[3], 
                     "Contestants_Contestant_ID_Winner": game[4],
                     "GameCreation_Type": game[5],
                     "GameCreation_Options": game[6] }
        results.append(gameDict)
    cursor.close()
    conn.close()
    return results

# Returns a list of candidate games for deletion
def getProposedDeletes():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()

    cursor.callproc('SP_Game_DELETE_Candidates_Prod', [])
    results = []
    for rows in cursor.stored_results():
            for r in rows:
                result = {"Game_ID": r[0], "Game_Date": r[1]}
                results.append(result)                
    cursor.close()
    cnx.commit()
    cnx.close()
    return results

# Executes deletion of games
def executeDeletions():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()

    cursor.callproc('SP_Delete_All_Game_Records', [])
    for rows in cursor.stored_results():
            for r in rows:
                result = r[0]
    print(result)
    cursor.close()
    cnx.commit()
    cnx.close()
    return { "message": "success", "gamesDeleted": None }

# RAndomly insert data to signify end of game
#  This here for illustrative purposes only until the 
#  front-end devleopment builds this functionality.
def fakeUpdate(gameID):
    # Randomly select winning contestant and update Game table to reflect
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()
    query = """UPDATE Games
        SET Contestants_Contestant_ID_Winner = (
        SELECT Contestants_Contestant_ID
          FROM Game_Contestants
         WHERE Games_Game_ID = {0}
         ORDER BY RAND()
         LIMIT 1),
                Game_End_Date = Now()
                WHERE Game_ID = {0}""".format(gameID)
    print(query)
    cursor.execute(query)
    r = cursor.rowcount
    cnx.commit()
    cursor.close()
    cnx.close()
    return r

# Return questions for a specific game
def getQuestions(questionID):
    conn = cs411_db.getConnection()
    cursor = conn.cursor()
    
    query = ("""SELECT Question_Text, Category, Value, Round, Questions_Question_ID
        FROM Game_Questions
        WHERE Games_Game_ID={}""".format(questionID))
    cursor.execute(query)

    answers = {}
    # { "GAMES": [ {question: "This game has a queen and king", answer: "Chess"}, .... ]
    for tup in cursor:
        print(tup)
        (qid, category, question, value, rnd) = (tup[4], tup[1].decode(), tup[0].decode(), tup[2], tup[3].decode())
        t = {"question_id": qid, "question": question, "round": rnd, "value": value}
        if category in answers: answers[category].append(t)
        else: answers[category] = [t]

    result = {
        "Games_Game_ID": questionID,
        "categories": [],
        "round1": [],
        "round2": [],
        "final": [],

        "questions": answers
    }
    print(answers)
    for c in answers.keys():
        print(c)
        result["categories"].append(c)
        if (answers[c][0]["round"] == '1'): result["round1"].append(c)
        elif (answers[c][0]["round"] == '2'): result["round2"].append(c)
        else: result["final"] = c

    new_round_1 = []
    for cat in result["round1"]:
        r = { "category": cat, "questions": [] }
        for q in result["questions"][cat]:
            r["questions"].append(q)
        new_round_1.append(r)

    new_round_2 = []
    for cat in result["round2"]:
        r = { "category": cat, "questions": [] }
        for q in result["questions"][cat]:
            r["questions"].append(q)
        new_round_2.append(r)

    print(result["final"])
    print(result["questions"])
    new_final = { "category": result["final"],
        "questions": [ result["questions"][result["final"]] ]
    }

    new_result = {
        "Games_Game_ID": questionID,
        "round1": new_round_1,
        "round2": new_round_2,
        "final": new_final
    }

    cursor.close()
    conn.close()
    return new_result