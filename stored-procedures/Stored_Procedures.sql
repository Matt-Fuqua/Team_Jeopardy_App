-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 20, 2020 at 06:39 PM
-- Server version: 10.1.44-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs411teambfs_Development`
--

DELIMITER $$
--
-- Procedures
--


$$

CREATE PROCEDURE `SP_Generate_Simulated_Answers_PROD` (IN `gameID` INT)  BEGIN
    DECLARE done BOOLEAN DEFAULT 0; 
    DECLARE question_ID INT; 
    DECLARE ques_value INT;
    DECLARE first_pick FLOAT; 
    DECLARE ans_probability FLOAT;
    DECLARE cur_picker INT; 
    DECLARE cont_one INT;
    DECLARE cont_two INT;
    DECLARE correct_ans CHAR(1);

    DECLARE i INT DEFAULT 0;
   
    DECLARE question_list CURSOR FOR

      SELECT Game_Questions_ID, Value
      FROM
            Game_Questions
      WHERE
          Games_Game_ID = gameID; 
    
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;
    
    SELECT Contestants_Contestant_ID FROM Game_Contestants WHERE Games_Game_ID = gameID ORDER BY 1 ASC LIMIT 1 INTO cont_one;
    SELECT Contestants_Contestant_ID FROM Game_Contestants WHERE Games_Game_ID = gameID ORDER BY 1 DESC LIMIT 1 INTO cont_two;

    OPEN question_list; 
    REPEAT 
    
      FETCH question_list INTO question_ID, ques_value;


      IF ( ! done ) THEN
              SELECT RAND() INTO first_pick;
              IF first_pick < 0.5 THEN 
                SET cur_picker = cont_one;
              ELSE 
                SET cur_picker = cont_two;
              END IF;


              SELECT RAND() INTO ans_probability;

              SET correct_ans = 'N';

              CASE ques_value
                WHEN 200 THEN
                  IF ans_probability < .85 THEN
                    SET correct_ans = 'Y';
                  END IF;
                WHEN 400 THEN
                  IF ans_probability < .80 THEN
                    SET correct_ans = 'Y';
                  END IF;
                WHEN 600 THEN
                  IF ans_probability < .75 THEN
                    SET correct_ans = 'Y';
                  END IF;
                WHEN 800 THEN
                  IF ans_probability < .70 THEN
                    SET correct_ans = 'Y';
                  END IF;
                WHEN 1000 THEN
                  IF ans_probability < .65 THEN
                    SET correct_ans = 'Y';
                  END IF;
                WHEN 1200 THEN
                  IF ans_probability < .60 THEN
                    SET correct_ans = 'Y';
                  END IF;
                WHEN 1600 THEN
                  IF ans_probability < .55 THEN
                    SET correct_ans = 'Y';
                  END IF;
                WHEN 2000 THEN
                  IF ans_probability < .50 THEN
                    SET correct_ans = 'Y';
                  END IF;
                ELSE
                  SET correct_ans = 'N';
                END CASE;

                IF correct_ans = 'Y' THEN
                  INSERT INTO `Game_Answers` (`Game_Answers_ID`, `GameQuestions_ID`, `Contestant_Contestant_ID`, `ContestantAnswer`, `AnswerConsideredCorrect`, `Games_Game_ID`) 
                  VALUES (NULL, question_id, cur_picker, 'CORRECT', 'Y', gameID);
                ELSE
                  INSERT INTO `Game_Answers` (`Game_Answers_ID`, `GameQuestions_ID`, `Contestant_Contestant_ID`, `ContestantAnswer`, `AnswerConsideredCorrect`, `Games_Game_ID`) 
                  VALUES (NULL, question_id, cur_picker, 'WRONG', 'N', gameID);
                END IF;

                IF correct_ans = 'N' THEN
                      IF cur_picker = cont_one THEN
                        SET cur_picker = cont_two;
                      ELSE SET cur_picker = cont_one;
                      END IF;

                      SELECT RAND() INTO ans_probability;

                      SET correct_ans = 'N';

                      CASE ques_value
                        WHEN 200 THEN
                          IF ans_probability < .85 THEN
                            SET correct_ans = 'Y';
                          END IF;
                        WHEN 400 THEN
                          IF ans_probability < .80 THEN
                            SET correct_ans = 'Y';
                          END IF;
                        WHEN 600 THEN
                          IF ans_probability < .75 THEN
                            SET correct_ans = 'Y';
                          END IF;
                        WHEN 800 THEN
                          IF ans_probability < .70 THEN
                            SET correct_ans = 'Y';
                          END IF;
                        WHEN 1000 THEN
                          IF ans_probability < .65 THEN
                            SET correct_ans = 'Y';
                          END IF;
                        WHEN 1200 THEN
                          IF ans_probability < .60 THEN
                            SET correct_ans = 'Y';
                          END IF;
                        WHEN 1600 THEN
                          IF ans_probability < .55 THEN
                            SET correct_ans = 'Y';
                          END IF;
                        WHEN 2000 THEN
                          IF ans_probability < .50 THEN
                            SET correct_ans = 'Y';
                          END IF;
                        ELSE
                          SET correct_ans = 'N';
                        END CASE;
            

                        IF correct_ans = 'Y' THEN
                         INSERT INTO `Game_Answers` (`Game_Answers_ID`, `GameQuestions_ID`, `Contestant_Contestant_ID`, `ContestantAnswer`, `AnswerConsideredCorrect`, `Games_Game_ID`) 
                          VALUES (NULL, question_id, cur_picker, 'CORRECT', 'Y', gameID);
                        ELSE
                          INSERT INTO `Game_Answers` (`Game_Answers_ID`, `GameQuestions_ID`, `Contestant_Contestant_ID`, `ContestantAnswer`, `AnswerConsideredCorrect`, `Games_Game_ID`) 
                          VALUES (NULL, question_id, cur_picker, 'WRONG', 'N', gameID);
                        END IF;
                END IF;
     
      END IF;
    UNTIL done END REPEAT; 

    CLOSE question_list;

END

$$


$$

CREATE PROCEDURE `SP_Delete_All_Game_Records`()
    BEGIN
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
          ROLLBACK;
          SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
        END;

        DECLARE EXIT HANDLER FOR SQLWARNING
        BEGIN
          ROLLBACK;
          SELECT 'An wanring has occurred, operation rollbacked and the stored procedure was terminated';
        END;



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

$$


--


$$

CREATE PROCEDURE `SP_Game_DELETE_Candidates_PROD` ()

BEGIN
    
    SELECT `Game_ID`, `Game_Date`
    FROM `View_Delete_Candidates`;
END$$


$$

CREATE PROCEDURE `SP_Create_Game_PROD` (OUT `new_gameid` INT)  BEGIN
    
	INSERT INTO Games(Game_Date, Contestants_Contestant_ID_Winner) Values (CURRENT_TIMESTAMP(), -1);
	SELECT LAST_INSERT_ID() INTO new_gameid;
END$$

$$

CREATE PROCEDURE `SP_Generate_Categories_PROD` ()  BEGIN
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
    CALL SP_Create_Game_PROD(@new_gameid);
    
    INSERT INTO Game_Contestants(Games_Game_ID,Contestants_Contestant_ID) VALUES (@new_gameid,1000);

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
     			INSERT INTO Game_Questions(Games_Game_ID, Questions_Question_ID, Question_Text, Answer_Text, Category, `Value`, Round)
			SELECT @new_gameid, Question_ID, Question_Text, Question_Answer,Questions.Category, `Value`, rnd
           		FROM Questions
			WHERE Questions.Category = catarray
           		ORDER BY RAND () LIMIT 5;
                CALL SP_Generate_Question_Values_PROD(@new_gameid, catarray);
     		ELSE      
     			INSERT INTO Game_Questions(Games_Game_ID, Questions_Question_ID, Question_Text, Answer_Text, Category, Round)
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

$$

CREATE PROCEDURE `SP_Generate_Question_Values_PROD` (IN `gameID` INT, IN `quest_cat` VARCHAR(50) CHARSET utf8)  BEGIN
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
        		Game_Questions
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
	
		
	  	UPDATE Game_Questions
		SET
			Value = i
		WHERE
			Games_Game_ID = gID AND Questions_Question_ID = quesID AND Category = cat;
 	 
		 
	END IF;
    UNTIL done END REPEAT; 

    CLOSE question_list;

END$$

CREATE PROCEDURE `SP_Insert_Answer` (IN `gm_ques_id` INT, IN `contest_id` INT, IN `contest_ans` VARCHAR(500), IN `ans_cons_correct` VARCHAR(1), IN `gm_gm_id` INT)  NO SQL
BEGIN

    DECLARE EXIT HANDLER FOR 1062 SELECT 'Duplicate keys error encountered' Message; 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SELECT 'SQLException encountered' Message; 
    DECLARE EXIT HANDLER FOR SQLSTATE '23000' SELECT 'SQLSTATE 23000--Foreign Key Violation' Message;

INSERT INTO Game_Answers(GameQuestions_ID, Contestant_Contestant_ID, ContestantAnswer, AnswerConsideredCorrect, Games_Game_ID)
VALUES(gm_ques_id, contest_id, contest_ans, ans_cons_correct, gm_gm_id);
SELECT 1;
END$$

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

$$


$$

CREATE PROCEDURE `SP_Load_Data_PROD` ()  BEGIN
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
    CALL SP_Create_Game_PROD(@new_gameid);
    
    INSERT INTO Game_Contestants(Games_Game_ID,Contestants_Contestant_ID) VALUES (@new_gameid,(SELECT DISTINCT Contestant_ID FROM Contestants WHERE Users_User_ID = "Generated.Data" ORDER BY RAND() LIMIT 1));
    INSERT INTO Game_Contestants(Games_Game_ID,Contestants_Contestant_ID) VALUES (@new_gameid,(SELECT DISTINCT Contestant_ID FROM Contestants WHERE Users_User_ID = "Computer.User" ORDER BY RAND() LIMIT 1));


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
      INSERT INTO Game_Questions(Games_Game_ID, Questions_Question_ID, Question_Text, Answer_Text, Category, `Value`, Round)
      SELECT @new_gameid, Question_ID, Question_Text, Question_Answer,Questions.Category, `Value`, rnd
              FROM Questions
      WHERE Questions.Category = catarray
              ORDER BY RAND () LIMIT 5;
                CALL SP_Generate_Question_Values_PROD(@new_gameid, catarray);
    ELSE      
          INSERT INTO Game_Questions(Games_Game_ID, Questions_Question_ID, Question_Text, Answer_Text, Category, Round)
      SELECT @new_gameid, Question_ID, Question_Text, Question_Answer,Questions.Category,  rnd
              FROM Questions
      WHERE Questions.Category = catarray
              ORDER BY RAND () LIMIT 1;
      END IF;
  END IF;
    UNTIL done END REPEAT; 

    CLOSE cat_list;
    
    CALL SP_Generate_Simulated_Answers_PROD(@new_gameid);
END$$

$$  

CREATE PROCEDURE SP_Loop_Load_PROD (IN `numtoins` INT)

   BEGIN
      DECLARE a INT Default 0 ;
      simple_loop: LOOP
         SET a=a+1;

         CALL SP_Load_Data_PROD();

         IF a=numtoins THEN
            LEAVE simple_loop;
         END IF;
   END LOOP simple_loop;
END $$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Contestants`
--

CREATE TABLE `Contestants` (
  `Contestant_ID` int(11) NOT NULL,
  `CFirst_Name` varchar(50) COLLATE utf8_bin NOT NULL,
  `CLast_Name` varchar(50) COLLATE utf8_bin NOT NULL,
  `No_Wins` int(11) DEFAULT NULL,
  `Winnings` float DEFAULT NULL,
  `Is_Computer` varchar(1) COLLATE utf8_bin DEFAULT NULL,
  `Is_Student` varchar(1) COLLATE utf8_bin DEFAULT NULL,
  `Users_User_ID` varchar(50) COLLATE utf8_bin NOT NULL,
  `Skill_Level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Dev_Category`
--

CREATE TABLE `Dev_Category` (
  `Game_ID` int(11) NOT NULL,
  `Category` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Dev_Games`
--

CREATE TABLE `Dev_Games` (
  `Game_ID` int(11) NOT NULL,
  `Game_Date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Dev_Game_Questions`
--

CREATE TABLE `Dev_Game_Questions` (
  `Games_Game_ID` int(11) NOT NULL,
  `Questions_Question_ID` int(11) NOT NULL,
  `Question_Text` varchar(500) COLLATE utf8_bin NOT NULL,
  `Answer_Text` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `Category` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `Value` int(11) DEFAULT NULL,
  `Round` varchar(1) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Games`
--

CREATE TABLE `Games` (
  `Game_ID` int(11) NOT NULL,
  `Gamescol` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Game_Date` datetime DEFAULT NULL,
  `Game_End_Date` datetime DEFAULT NULL,
  `Contestants_Contestant_ID_Winner` int(11) NOT NULL,
  `GameCreation_Type` int(11) DEFAULT NULL,
  `GameCreation_Options` text COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Game_Answers`
--

CREATE TABLE `Game_Answers` (
  `Game_Answers_ID` int(11) NOT NULL,
  `GameQuestions_ID` int(11) NOT NULL,
  `Contestant_Contestant_ID` int(11) NOT NULL,
  `ContestantAnswer` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `AnswerConsideredCorrect` varchar(1) COLLATE utf8_bin DEFAULT NULL,
  `Games_Game_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Game_Contestants`
--

CREATE TABLE `Game_Contestants` (
  `Games_Game_ID` int(11) NOT NULL,
  `Contestants_Contestant_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Game_Questions`
--

CREATE TABLE `Game_Questions` (
  `Game_Questions_ID` int(11) NOT NULL,
  `Games_Game_ID` int(11) NOT NULL,
  `Questions_Question_ID` int(11) NOT NULL,
  `Question_Text` varchar(500) COLLATE utf8_bin NOT NULL,
  `Answer_Text` varchar(500) COLLATE utf8_bin NOT NULL,
  `Category` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `Value` int(11) DEFAULT NULL,
  `Round` varchar(1) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Questions`
--

CREATE TABLE `Questions` (
  `Question_ID` int(11) NOT NULL,
  `Question_Archive_ID` int(11) NOT NULL,
  `Question_Text` varchar(500) COLLATE utf8_bin NOT NULL,
  `Question_Answer` varchar(500) COLLATE utf8_bin NOT NULL,
  `Category` varchar(100) COLLATE utf8_bin NOT NULL,
  `Value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Question_Archive`
--

CREATE TABLE `Question_Archive` (
  `Question_ID` int(11) NOT NULL,
  `Answer` varchar(500) COLLATE utf8_bin NOT NULL,
  `Round` varchar(1) COLLATE utf8_bin NOT NULL,
  `Question_Text` varchar(500) COLLATE utf8_bin NOT NULL,
  `Category` varchar(100) COLLATE utf8_bin NOT NULL,
  `Value` int(11) DEFAULT NULL,
  `Daily_Double` char(3) COLLATE utf8_bin DEFAULT NULL,
  `Air_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `User_ID` varchar(50) COLLATE utf8_bin NOT NULL,
  `Password` varchar(50) COLLATE utf8_bin NOT NULL,
  `Create_Date` date NOT NULL,
  `Account_Admin` char(1) COLLATE utf8_bin NOT NULL,
  `Account_Active` char(1) COLLATE utf8_bin NOT NULL,
  `UFirst_Name` varchar(50) COLLATE utf8_bin NOT NULL,
  `ULast_Name` varchar(50) COLLATE utf8_bin NOT NULL,
  `Email` varchar(75) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE VIEW `View_Delete_Candidates` AS SELECT `Game_ID`, `Game_Date`
    FROM `Games` WHERE `Game_End_Date` IS NULL and TIMESTAMPDIFF(HOUR,`Game_Date`, NOW()) > 2;


DELIMITER $$

CREATE TRIGGER `trigger_new_user_added` 
AFTER INSERT ON `Users` FOR EACH ROW
BEGIN
INSERT INTO Contestants (CFirst_Name, CLast_Name, No_Wins, Winnings,  Is_Computer, Is_Student, Users_User_ID, Skill_Level)
Values (new.UFirst_Name, new.ULast_Name, 0, 0, “N”, “N”, new.User_ID, 1);
END$$

DELIMITER ;


--
-- Indexes for dumped tables
--
ALTER TABLE `Questions` DROP INDEX `INDX_Category`, ADD INDEX `INDX_Category` (`Category`) USING BTREE;
--
-- Indexes for table `Contestants`
--
ALTER TABLE `Contestants`
  ADD PRIMARY KEY (`Contestant_ID`,`Users_User_ID`),
  ADD KEY `fk_Contestants_Users1_idx` (`Users_User_ID`);

--
-- Indexes for table `Dev_Category`
--
ALTER TABLE `Dev_Category`
  ADD PRIMARY KEY (`Game_ID`,`Category`);

--
-- Indexes for table `Dev_Games`
--
ALTER TABLE `Dev_Games`
  ADD PRIMARY KEY (`Game_ID`);

--
-- Indexes for table `Games`
--
ALTER TABLE `Games`
  ADD PRIMARY KEY (`Game_ID`,`Contestants_Contestant_ID_Winner`);

--
-- Indexes for table `Game_Answers`
--
ALTER TABLE `Game_Answers`
  ADD PRIMARY KEY (`Game_Answers_ID`,`GameQuestions_ID`,`Contestant_Contestant_ID`,`Games_Game_ID`),
  ADD KEY `fk_GameAnswers_GameQuestions_idx` (`GameQuestions_ID`),
  ADD KEY `fk_GameAnswers_Contestants_idx` (`Contestant_Contestant_ID`),
  ADD KEY `fk_GameAnswers_Games1_idx` (`Games_Game_ID`);

ALTER TABLE `Game_Answers`
ADD CONSTRAINT `uc_gameid_questid_contestid` UNIQUE (`Games_Game_ID`, `GameQuestions_ID`, `Contestant_Contestant_ID`);

--
-- Indexes for table `Game_Contestants`
--
ALTER TABLE `Game_Contestants`
  ADD PRIMARY KEY (`Games_Game_ID`,`Contestants_Contestant_ID`),
  ADD KEY `fk_Game_Contestants_Games1_idx` (`Games_Game_ID`),
  ADD KEY `fk_Game_Contestants_Contestants1_idx` (`Contestants_Contestant_ID`);

--
-- Indexes for table `Game_Questions`
--
ALTER TABLE `Game_Questions`
  ADD PRIMARY KEY (`Game_Questions_ID`,`Games_Game_ID`,`Questions_Question_ID`),
  ADD KEY `fk_Game_Questions_Questions1_idx` (`Questions_Question_ID`),
  ADD KEY `fk_Game_Questions_Games1` (`Games_Game_ID`);

--
-- Indexes for table `Questions`
--
ALTER TABLE `Questions`
  ADD PRIMARY KEY (`Question_ID`,`Question_Archive_ID`),
  ADD KEY `Questions_Archive_Questions_FK_idx` (`Question_Archive_ID`);

--
-- Indexes for table `Question_Archive`
--
ALTER TABLE `Question_Archive`
  ADD PRIMARY KEY (`Question_ID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Contestants`
--
ALTER TABLE `Contestants`
  MODIFY `Contestant_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Dev_Games`
--
ALTER TABLE `Dev_Games`
  MODIFY `Game_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Games`
--
ALTER TABLE `Games`
  MODIFY `Game_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Game_Answers`
--
ALTER TABLE `Game_Answers`
  MODIFY `Game_Answers_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Game_Questions`
--
ALTER TABLE `Game_Questions`
  MODIFY `Game_Questions_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Questions`
--
ALTER TABLE `Questions`
  MODIFY `Question_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Question_Archive`
--
ALTER TABLE `Question_Archive`
  MODIFY `Question_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Contestants`
--
ALTER TABLE `Contestants`
  ADD CONSTRAINT `fk_Contestants_Users1` FOREIGN KEY (`Users_User_ID`) REFERENCES `Users` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Game_Answers`
--
ALTER TABLE `Game_Answers`
  ADD CONSTRAINT `fk_Game_Answers_Contestants` FOREIGN KEY (`Contestant_Contestant_ID`) REFERENCES `Contestants` (`Contestant_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Game_Answers_GameQuestions` FOREIGN KEY (`GameQuestions_ID`) REFERENCES `Game_Questions` (`Game_Questions_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Game_Answers_Games` FOREIGN KEY (`Games_Game_ID`) REFERENCES `Games` (`Game_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Game_Contestants`
--
ALTER TABLE `Game_Contestants`
  ADD CONSTRAINT `fk_Game_Contestants_Contestants1` FOREIGN KEY (`Contestants_Contestant_ID`) REFERENCES `Contestants` (`Contestant_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Game_Contestants_Games1` FOREIGN KEY (`Games_Game_ID`) REFERENCES `Games` (`Game_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Game_Questions`
--
ALTER TABLE `Game_Questions`
  ADD CONSTRAINT `fk_Game_Questions_Games1` FOREIGN KEY (`Games_Game_ID`) REFERENCES `Games` (`Game_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Game_Questions_Questions1` FOREIGN KEY (`Questions_Question_ID`) REFERENCES `Questions` (`Question_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Questions`
--
ALTER TABLE `Questions`
  ADD CONSTRAINT `Questions_Archive_Questions_FK` FOREIGN KEY (`Question_Archive_ID`) REFERENCES `Question_Archive` (`Question_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
