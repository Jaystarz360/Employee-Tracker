DROP DATABASE IF EXISTS emp_track_db;
CREATE DATABASE emp_track_db;
USE emp_track_db;

CREATE TABLE dept_tabl (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    dept_name VARCHAR(50)
);

CREATE TABLE role_tabl (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    salary DECIMAL,
    dept_id INT,
    FOREIGN KEY (dept_id)
    REFERENCES dept_tabl(id)
);

CREATE TABLE emp_tabl (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role_tabl(id),
    FOREIGN KEY (manager_id)
    REFERENCES emp_tabl(id)
);

SHOW TABLES;
DESCRIBE emp_tabl;
DESCRIBE role_tabl;
DESCRIBE dept_tabl;