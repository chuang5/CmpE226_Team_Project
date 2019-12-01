ALTER TABLE checking
ADD FOREIGN KEY (customer) REFERENCES customers(customer_id);

ALTER TABLE saving
ADD FOREIGN KEY (customer) REFERENCES customers(customer_id);

ALTER TABLE credit_card
ADD FOREIGN KEY (customer) REFERENCES customers(customer_id);