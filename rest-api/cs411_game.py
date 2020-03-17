import cs411_db

# Create a new game
def newGame():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()

    cursor.callproc('SP_Generate_Categories', [])
    # print results
    print("Printing laptop details")
    for result in cursor.stored_results():
            for r in result:
                resultId = r[0]
    cursor.close()
    cnx.commit()
    cnx.close()

    return getQuestions(resultId)

# Return questions for a specific game
def getQuestions(questionID):
    conn = cs411_db.getConnection()
    cursor = conn.cursor()
    
    query = ("""SELECT Question_Text, Category, Value, Round, Questions_Question_ID
        FROM Dev_Game_Questions
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

    cursor.close()
    conn.close()
    return result