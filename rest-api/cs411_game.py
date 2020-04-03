import cs411_db

# Create a new game
def newGame():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()

    cursor.callproc('SP_Generate_Categories_Prod', [])
    for result in cursor.stored_results():
            for r in result:
                resultId = r[0]
    cursor.close()
    cnx.commit()
    cnx.close()

    return getQuestions(resultId)

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