from nltk.tokenize import word_tokenize
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
from flask import jsonify
import cs411_db
import string
table = str.maketrans('', '', string.punctuation)

porter = PorterStemmer()
stopWords = set(stopwords.words('english'))
punctuateTable = dict((ord(char), None) for char in string.punctuation)

def textCleaning(question):
    question = question.lower()                                     # convert to lower
    question = question.translate(punctuateTable)                              # remove punctuation
    tokens = word_tokenize(question)                                # convert string to a list
    stemmed = [porter.stem(word) for word in tokens]                # stem verbs to be in same tense
    result = [word for word in stemmed if word not in stopWords]    # remove the, an, and, etc.
    return(result)

# Stupid attempt at logic
# How many items does the right answer and the contestant's guess
#  have in common after preprocessing
def answerCorrect(Right, Guess):
    result = 0.0
    for r, g in zip(Right, Guess):
        if r==g: result += 1.0
    return result / float(len(Right))

# Return category and answer text of a random question
def randomAnswer():
    """Returns a questionID, Category and Answer at random for testing."""
    conn = cs411_db.getConnection()
    curs = conn.cursor()

    # Check that the user name is not already taken.
    query = """SELECT Question_ID, Category, Question_Text FROM Questions ORDER BY RAND() LIMIT 1""" 
    curs.execute(query)
    result = curs.fetchone()
    curs.close()
    conn.close()

    (id, category, answer) = (result[0], result[1].decode(), result[2].decode())
    return {"Question_ID": id, "Category": category, "Answer": answer }
 
def checkAnswer(questionID, questionGuess):
    """Checks the guessed answer for a given ID.  Return a dictionary containing:
        Question_ID:  The ID of the Question asked.  (You passed this in)
        CorrectQuestion: The actual correct question according to the archives.
        ParsedQuestion:  The actual correct question ran through text cleaning.
        YourGuess:  The text of the user guess (You passed this in)
        ParsedGuess:  The text of the user guess ran through the text cleaning.
        CorrectGuess:  A score between 0 and 1 that indicates how correct your guess is.
        ConsideredCorrect: a Y or N that removes any doubt about whether the question should be considered correct.
    """
    conn = cs411_db.getConnection()
    curs = conn.cursor()

    query = """SELECT Question_Answer
        FROM Questions
        WHERE Question_ID = {0}""" .format(questionID)
    curs.execute(query)
    result = curs.fetchone()
    print(result)
    question = result[0].decode()
    curs.close()
    conn.close()

    questionParsed = textCleaning(question)
    questionGuessParsed = textCleaning(questionGuess)
    score = answerCorrect(questionParsed, questionGuessParsed)
    correct = (score >= 0.5)

    result = {
        "Question_ID": questionID,
        "CorrectQuestion": question,
        "ParsedQuestion": str(questionParsed),
        "YourGuess": questionGuess,
        "ParsedGuess": questionGuessParsed,
        "Correctness": score,
        "ConsideredCorrect": 'Y' if correct else 'N'
    }
    return result
    
def submitAnswer(Games_Game_ID, GameQuestions_ID, Contestant_Coontestant_ID, questionGuess):
    """Submits the guessed answer for a given ID.  Return a dictionary containing:

        status: 'Y' for successful writing to database, 0 otherwise
        message: The reason the update to database failed if applicapable
        Games_Game_ID: The ID of the Game.  (You passed this in)
        GameQuestions_ID:  The ID of the Question asked.  (You passed this in)
        Contestant_Contestant_ID: The ID of the Contestant. (You passed this in)
        CorrecAnswer: The actual correct question according to the archives.
        ConsideredCorrect: a Y or N that if the question is considered correct.
    """

    check = checkAnswer(GameQuestions_ID, questionGuess)

    conn = cs411_db.getConnection()
    curs = conn.cursor()
    curs.callproc("SP_Insert_Answer", (GameQuestions_ID,
        Contestant_Coontestant_ID,
        questionGuess,
        check["CorrectQuestion"],
        Games_Game_ID))

    curs.close()

    for result in cursor.stored_results():
            for r in result:
                success = r[0]
                message = r[1].decode()
    
    cursor.close()
    cnx.commit()
    
    result = {
        "status": success,
        "message": message,
        "Games_Game_ID": Games_Game_ID,
        "GameQuestions_ID": GameQuestions_ID,
        "Contestant_Coontestant_ID": Contestant_Coontestant_ID,
        "CorrectAnswer": check["CorrectQuestion"],
        "ConsideredCorrect": check["ConsideredCorrect"]
    }
    return result

# Interactive tool to debug 
def interactiveDebug():
    conn = cs411_db.getConnection()
    curs = conn.cursor()

    # Check that the user name is not already taken.
    query = """SELECT Question_ID, Category, Question_Text, Question_Answer FROM Questions ORDER BY RAND() LIMIT 1""" 
    curs.execute(query)
    result = curs.fetchone()
    (id, category, answer, question) = (result[0], result[1].decode(), result[2].decode(), result[3].decode())
    curs.close()
    conn.close()
    
    print("CATEGORY {0} ... The answer is:  {1}".format(category, answer))
    yourGuess = input("What is the Question? ")

    question = textCleaning(question)
    yourGuess = textCleaning(yourGuess)

    print("Your guess scored: {0}\n".format(answerCorrect(question, yourGuess)))
    print("The right answer was {0}, but you answered {1}.\n".format(str(question),str(yourGuess)))
