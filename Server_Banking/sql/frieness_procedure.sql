/**
 * SJSU CMPE226 Fall2019 TEAM4
 * 
 *  */

USE `226team`;
DROP procedure IF EXISTS `frieness`;

DELIMITER $$
USE `226team`$$
CREATE PROCEDURE frieness (IN sender_acct varchar(255), IN receiver_acct varchar(255), IN num decimal, IN today date, IN message varchar(255))
myprocedure:BEGIN
	DECLARE _rollback BOOL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;

	SELECT balance
	FROM checking
	WHERE account_num = sender_acct
	into @x;
	if @x < num then
		LEAVE myprocedure;
	end if;

	start transaction;
		UPDATE checking
		SET balance = balance - num
		WHERE account_num = sender_acct;
        INSERT INTO checking_statement (user, user_account, partner_account, category, amount, date, balance) 
		SELECT customer, account_num, receiver_acct, 'transfer', num, today, balance
		FROM checking
        WHERE account_num = sender_acct;
		UPDATE checking
		SET balance = balance + num
		WHERE account_num = receiver_acct;
		INSERT INTO checking_statement (user, user_account, partner_account, category, amount, date, balance) 
		SELECT customer, account_num, sender_acct, 'transfer', num, today, balance
		FROM checking
        WHERE account_num = receiver_acct;
        INSERT INTO frieness (user, user_account, partner_account, amount, date, description)
        SELECT customer, account_num, receiver_acct, num, today, message
        FROM checking
        WHERE account_num = sender_acct;
	IF _rollback = 1 THEN
		ROLLBACK;
	ELSE
		COMMIT;
	END IF;
END$$

DELIMITER ;