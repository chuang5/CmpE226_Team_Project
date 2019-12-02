/**
 * SJSU CMPE226 Fall2019 TEAM4
 * 
 *  */

USE `226team`;
DROP procedure IF EXISTS `saving_to_checking`;

DELIMITER $$
USE `226team`$$
CREATE PROCEDURE saving_to_checking (IN save_acct varchar(255), IN check_acct varchar(255), IN num decimal, IN today date)
myprocedure:BEGIN
	DECLARE _rollback BOOL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;

	SELECT balance
	FROM saving
	WHERE account_num = save_acct
	into @x;
	if @x < num then
		LEAVE myprocedure;
	end if;

	start transaction;
		UPDATE saving
		SET balance = balance - num
		WHERE account_num = save_acct;
        INSERT INTO saving_statement (user, user_account, partner_account, category, amount, date, balance) 
		SELECT customer, account_num, check_acct, 'withdraw', num, today, balance
		FROM saving
        WHERE account_num = save_acct;
		UPDATE checking
		SET balance = balance + num
		WHERE account_num = check_acct;
		INSERT INTO checking_statement (user, user_account, partner_account, category, amount, date, balance) 
		SELECT customer, account_num, save_acct, 'deposite', num, today, balance
		FROM checking
        WHERE account_num = check_acct;
	IF _rollback = 1 THEN
		ROLLBACK;
	ELSE
		COMMIT;
	END IF;
END$$

DELIMITER ;