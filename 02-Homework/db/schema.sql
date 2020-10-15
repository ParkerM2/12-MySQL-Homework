### Schema

CREATE DATABASE company_db;
USE company_db;

CREATE TABLE company
(
	id int NOT NULL AUTO_INCREMENT,
	department varchar(255) NOT NULL,
	roles varchar(255) NOT NULL,
    employees varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

SELECT * FROM company;
