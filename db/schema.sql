### Schema

CREATE DATABASE company_db;
USE company_db;

CREATE TABLE company
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	roles varchar(255) NOT NULL,
	department varchar(255) NOT NULL,
	salary varchar(255) NOT NULL,
    manager varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

SELECT * FROM company;
