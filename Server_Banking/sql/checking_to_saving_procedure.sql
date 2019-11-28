USE `226team`;
DROP procedure IF EXISTS `checking_to_saving`;

DELIMITER $$
USE `226team`$$
CREATE PROCEDURE checking_to_saving (IN check_acct varchar(255), IN save_acct varchar(255), IN num decimal, IN today date)
BEGIN
	DECLARE _rollback BOOL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;
	start transaction;
		UPDATE checking
		SET balance = balance - num
		WHERE account_num = check_acct;
        INSERT INTO checking_statement (user, user_account, partner_account, category, amount, date, balance) 
		SELECT customer, account_num, save_acct, 'withdraw', num, today, balance
		FROM checking
        WHERE account_num = check_acct;
		UPDATE saving
		SET balance = balance + num
		WHERE account_num = save_acct;
		INSERT INTO saving_statement (user, user_account, partner_account, category, amount, date, balance) 
		SELECT customer, account_num, check_acct, 'deposite', num, today, balance
		FROM saving
        WHERE account_num = save_acct;
	IF _rollback = 1 THEN
		ROLLBACK;
	ELSE
		COMMIT;
	END IF;
END$$

DELIMITER ;