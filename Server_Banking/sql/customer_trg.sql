/**
 * SJSU CMPE226 Fall2019 TEAM4
 * 
 *  */

DROP TABLE IF EXISTS `customer_log`;

CREATE TABLE `customer_log` (
  `customer_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `old_name` varchar(40) DEFAULT NULL,
  `old_phone` varchar(40) DEFAULT NULL,
  `old_address` varchar(40) DEFAULT NULL,
  `new_name` varchar(40) DEFAULT NULL,
  `new_phone` varchar(40) DEFAULT NULL,
  `new_address` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TRIGGER customer_trg
AFTER UPDATE ON customers
FOR EACH ROW
	INSERT into customer_log
    VALUES (OLD.customer_id, now(), OLD.name, OLD.phone, OLD.address, NEW.name, NEW.phone, NEW.address);