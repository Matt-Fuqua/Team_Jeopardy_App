import cs411_db

# Return the top 10 easiest categories (per # of correct questions)
def easyCategory():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()
    query = """SELECT Game_Questions_RPT.Category, COUNT(Category) AS "Correct Answers"
                 FROM Game_Questions_RPT, Game_Answers_RPT
                WHERE Game_Questions_RPT.Game_Questions_ID = Game_Answers_RPT.GameQuestions_ID
                  AND ContestantAnswer = "CORRECT"
               GROUP BY Category
               ORDER BY 2 DESC
               LIMIT 10"""
    cursor.execute(query)
    results = {}
    for row in cursor:
        results[row[0].decode()] = row[1]
    cnx.close()
    return results

# Return the top 10 hardest categories (per # of wrong questions)
def toughCategory():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()
    query = """SELECT Game_Questions_RPT.Category, COUNT(Category) AS "Incorrect Answers"
                 FROM Game_Questions_RPT, Game_Answers_RPT
                WHERE Game_Questions_RPT.Game_Questions_ID = Game_Answers_RPT.GameQuestions_ID
                  AND ContestantAnswer = "WRONG"
               GROUP BY Category
               ORDER BY 2 DESC
               LIMIT 10"""
    cursor.execute(query)
    results = {}
    for row in cursor:
        results[row[0].decode()] = row[1]
    cnx.close()
    return results

# Return the top 10 winningest contestants
def bestContestants():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()
    query = """SELECT CONCAT(CFirst_Name, " ", CLast_Name) AS Name, no_wins AS "Total Number of Wins"
                 FROM Contestants_RPT
                WHERE Contestant_ID <> 1000
                ORDER BY 2 DESC
                LIMIT 10"""
    cursor.execute(query)
    results = {}
    for row in cursor:
        results[row[0].decode()] = row[1]
    cnx.close()
    return results

# Return the top 10 richest contestants
def richContestants():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()
    query = """SELECT CONCAT(CFirst_Name, " ", CLast_Name) AS Name, Winnings AS "Total Amount of Winnings"
                 FROM Contestants_RPT
                WHERE Contestant_ID <> 1000
                ORDER BY 2 DESC
                LIMIT 10"""
    cursor.execute(query)
    results = {}
    for row in cursor:
        results[row[0].decode()] = row[1]
    cnx.close()
    return results

# Return the top 10 contestants in terms of questions answering
def smartContestants():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()
    query = """SELECT CONCAT(CFirst_Name, " ", CLast_Name) AS Name, COUNT(*) AS "Number of Correct Guesses"
                 FROM Contestants_RPT,`Game_Answers_RPT` 
                WHERE Contestants_RPT.Contestant_ID = Game_Answers_RPT.Contestant_Contestant_ID
                  AND Game_Answers_RPT.ContestantAnswer = "CORRECT"
                  AND Contestant_Contestant_ID <> 1000
             GROUP BY `Contestant_Contestant_ID`
             LIMIT 10"""
    cursor.execute(query)
    results = {}
    for row in cursor:
        results[row[0].decode()] = row[1]
    cnx.close()
    return results

# Return the top 10 contestants in terms of questions answering
def dumbContestants():
    cnx = cs411_db.getConnection()
    cursor = cnx.cursor()
    query = """SELECT CONCAT(CFirst_Name, " ", CLast_Name) AS Name, COUNT(*) AS "Number of Incorrect Guesses"
                 FROM Contestants_RPT,`Game_Answers_RPT` 
                WHERE Contestants_RPT.Contestant_ID = Game_Answers_RPT.Contestant_Contestant_ID
                  AND Game_Answers_RPT.ContestantAnswer = "WRONG"
                  AND Contestant_Contestant_ID <> 1000
             GROUP BY `Contestant_Contestant_ID`
             LIMIT 10"""
    cursor.execute(query)
    results = {}
    for row in cursor:
        results[row[0].decode()] = row[1]
    cnx.close()
    return results
