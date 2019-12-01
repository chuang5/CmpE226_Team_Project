ALTER TABLE checking
ADD CONSTRAINT FK_checkingID
FOREIGN KEY (customer) REFERENCES customers(customer_id);

ALTER TABLE saving
ADD CONSTRAINT FK_savingID
FOREIGN KEY (customer) REFERENCES customers(customer_id);

ALTER TABLE credit_card
ADD CONSTRAINT FK_ccID
FOREIGN KEY (customer) REFERENCES customers(customer_id);