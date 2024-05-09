INSERT INTO dept_tbl (id, dept_name)
VALUES (10, "Power Weapons"),
       (11, "Power Armors"),
       (12, "Power Sheilds"),
       (13, "Fusion Core"),
       (14, "Orbital Specialist"),
       (15, "Vehicle Specialist"),
       (16, "Laundry");

SELECT * FROM dept_tbl;

INSERT INTO role_tbl (id, title, salary, dept_id)
VALUES (100, "Relay Installer", 25000, 10),
       (101, "Primary Weapon Tester", 15000, 10),
       (110, "Shinner Specialist", 45000, 11),
       (111, "Communications Specialist", 55000, 11),
       (112, "Hydration Installer", 4000, 11),
       (120, "Percentage Calculator Specialist", 2000, 12),
       (130, "Power Armor Intergration", 153000, 13),
       (140, "Geo Specialist", 46000, 14),
       (150, "Ground Crew Specialist", 75000, 15),
       (160, "Clerk", 400, 16);

SELECT * FROM role_tbl;

INSERT INTO emp_tbl (id, first_name, last_name, role_id, manager_id)
VALUES  (10101,"Kevin", "Nash", 100, NULL),
        (10102,"Steve", "Austin", 120, 10101),
        (10103,"Shawn", "Micheal", 130, NULL),
        (10104,"Jeff","Hardy", 111, 10103),
        (10105,"Matt", "Hardy", 150, 10103),
        (10106,"Roman","Reigns", 160, 10101),
        (10107,"John", "Cena", 160, NULL),
        (10108,"Scott", "Hall", 150, 10107),
        (10109,"Dusty", "Rhodes", 112, 10107),
        (10110,"Dwayne ", "Johnson", 111, 10101),
        (10111,"Brett", "Heart", 101, 10103),
        (10112,"Mark", "Calaway", 110, 10107);

SELECT * FROM emp_tbl;
SELECT 
emp_tbl.id AS 'Employee #',
CONCAT(emp_tbl.first_name," ",emp_tbl.last_name)AS Employee,
role_tbl.title AS Occupation,
manager_id AS Manager
FROM emp_tbl
INNER JOIN role_tbl ON emp_tbl.role_id = role_tbl.id
