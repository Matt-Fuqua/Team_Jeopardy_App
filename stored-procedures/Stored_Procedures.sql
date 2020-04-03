DELIMITER $$
--
-- Procedures

-- TEST

--
DROP PROCEDURE IF EXISTS `SP_Create_Game`$$
CREATE PROCEDURE `SP_Create_Game` (OUT `new_gameid` INT)  BEGIN
    
	INSERT INTO Dev_Games(Game_Date) Values (CURRENT_TIMESTAMP());
	SELECT LAST_INSERT_ID() INTO new_gameid;
END$$


DROP PROCEDURE IF EXISTS `SP_Generate_Categories`$$
CREATE PROCEDURE `SP_Generate_Categories` ()  BEGIN
    DECLARE done BOOLEAN DEFAULT 0; 
    DECLARE catarray VARCHAR(50); 
    DECLARE new_gameid INT;
    DECLARE i INT DEFAULT 0;
    DECLARE rnd VARCHAR(1);
    DECLARE cat_list CURSOR FOR


    
    	SELECT DISTINCT
        		category
    	FROM
        		Questions
    	ORDER BY RAND()
    	LIMIT 13; 
    
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1; 
    CALL SP_Create_Game(@new_gameid);
    
    OPEN cat_list; 
    REPEAT 
    
    	FETCH cat_list INTO catarray;


    	IF ( ! done ) THEN
		SET i=i+1;
		IF i <=6 THEN
	   	    SET rnd = "1";
		ELSEIF  i<=12 THEN
	               SET rnd = "2";
		ELSEIF i=13 THEN
	   	    SET rnd = "F";
    		END IF;
	
		
	  	INSERT INTO Dev_Category(Category, Game_ID) VALUES(catarray,@new_gameid);
 	 
		 
		IF rnd <> "F" THEN
     			INSERT INTO Dev_Game_Questions(Games_Game_ID, Questions_Question_ID, Question_Text, Answer_Text, Category, `Value`, Round)
			SELECT @new_gameid, Question_ID, Question_Text, Question_Answer,Questions.Category, `Value`, rnd
           		FROM Questions
			WHERE Questions.Category = catarray
           		ORDER BY RAND () LIMIT 5;
                CALL SP_Generate_Question_Values(@new_gameid, catarray);
     		ELSE      
     			INSERT INTO Dev_Game_Questions(Games_Game_ID, Questions_Question_ID, Question_Text, Answer_Text, Category, Round)
			SELECT @new_gameid, Question_ID, Question_Text, Question_Answer,Questions.Category,  rnd
           		FROM Questions
			WHERE Questions.Category = catarray
           		ORDER BY RAND () LIMIT 1;
	  	END IF;
	END IF;
    UNTIL done END REPEAT; 

    CLOSE cat_list;
    SELECT @new_gameid;
END$$

DROP PROCEDURE IF EXISTS `SP_Generate_Question_Values`$$
CREATE PROCEDURE `SP_Generate_Question_Values` (IN `gameID` INT, IN `quest_cat` VARCHAR(50) CHARSET utf8)  BEGIN
    DECLARE done BOOLEAN DEFAULT 0; 
    DECLARE gID INT; 
    DECLARE quesID INT; 
    DECLARE cat VARCHAR(100); 
    DECLARE val INT;
    DECLARE rnd VARCHAR(1);

    DECLARE i INT DEFAULT 0;
   

     
    
    DECLARE question_list CURSOR FOR

    	SELECT Games_Game_ID, Questions_Question_ID, Category, Value, Round 
    	FROM
        		Dev_Game_Questions
    	WHERE
		Games_Game_ID = gameID and Category = quest_cat; 
    
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;
    
    OPEN question_list; 
    REPEAT 
    
    	FETCH question_list INTO gID, quesID, cat, val, rnd;


    	IF ( ! done ) THEN
		IF rnd = '1' THEN
	   	    SET i = i + 200;
		ELSE  
	               SET i = i + 400;
    		END IF;
	
		
	  	UPDATE Dev_Game_Questions
		SET
			Value = i
		WHERE
			Games_Game_ID = gID AND Questions_Question_ID = quesID AND Category = cat;
 	 
		 
	END IF;
    UNTIL done END REPEAT; 

    CLOSE question_list;

END$$


DROP PROCEDURE IF EXISTS `SP_Insert_Users`$$
CREATE PROCEDURE `SP_Insert_Users` (IN `uid` VARCHAR(50), IN `pw` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `email_in` VARCHAR(75))  NO SQL
BEGIN

DECLARE date_create date DEFAULT "2020-03-02";

    DECLARE EXIT HANDLER FOR 1062 SELECT 'Duplicate keys error encountered' Message; 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SELECT 'SQLException encountered' Message; 
    DECLARE EXIT HANDLER FOR SQLSTATE '23000' SELECT 'SQLSTATE 23000' ErrorCode;

SET date_create = CURRENT_DATE();

INSERT INTO Users(User_ID, `Password`, Create_Date, Account_Admin, Account_Active, UFirst_Name, ULast_Name, Email)
VALUES(uid, pw, date_create, 'N', 'Y', fname, lname, email_in);

SELECT 1;

END$$

DROP PROCEDURE IF EXISTS `SP_Validate_User`$$
CREATE PROCEDURE `SP_Validate_User` (IN `uid` VARCHAR(50), IN `pw` VARCHAR(50))  BEGIN

	SELECT EXISTS(SELECT * FROM Users WHERE Users.User_ID = uid AND Users.Password = pw);

END$$

DROP PROCEDURE IF EXISTS `SP_Game_DELETE_Candidates_PROD`$$
CREATE PROCEDURE `SP_Game_DELETE_Candidates_PROD` () BEGIN
	SELECT Game_ID, Game_Date
	FROM View_Delete_Candidates;
END$$


DROP PROCEDURE IF EXISTS `SP_Delete_All_Game_Records`$$
CREATE PROCEDURE `SP_Delete_All_Game_Records` () BEGIN
	SET AUTOCOMMIT = 0 ;
	SET FOREIGN_KEY_CHECKS = 0;
	START TRANSACTION;
	DELETE FROM `Game_Answers` WHERE `Games_Game_ID` IN(SELECT `Game_ID` FROM `View_Delete_Candidates`) ;
	DELETE FROM `Game_Questions` WHERE `Games_Game_ID` IN(SELECT `Game_ID` FROM `View_Delete_Candidates`) ;
	DELETE FROM `Game_Contestants` WHERE `Games_Game_ID` IN(SELECT `Game_ID` FROM `View_Delete_Candidates`) ;
	DELETE FROM `Dev_Category` WHERE `Game_ID` IN(SELECT `Game_ID` FROM `View_Delete_Candidates`) ;
	DELETE FROM `Games` WHERE `Game_End_Date` IS NULL and TIMESTAMPDIFF(HOUR,`Game_Date`, NOW()) > 2;
	SET FOREIGN_KEY_CHECKS = ON;
	COMMIT;
	SET AUTOCOMMIT = 1;
	SELECT 1;
END$$
