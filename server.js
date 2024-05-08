const fs = require("fs/promises");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const app = express();
const express = require("express");
const { pause, addDeptQuest, viewBudgetQuest } = require("./util/questions");

const {
  addRoleQuest,
  addEmpQuest,
  updEmpRoleQuest,
  question,
  whichDeptQuest,
} = require("./util/questions");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Nightlife001!",
    database: "emp_track_db",
  },
    
  console.log(`Connected to the database...`)
  );

function askQ() {
  inquirer.prompt(question).then((ans) => {
  switch (ans.task) {
    case "View all departments":
      viewAlldepts();
      break;
    case "View all roles":
      viewAllroles();
      break;
    case "View all employees":
      viewAllemployees();
      break;
    case "Add a department":
      addDept();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add an Employee":
      addEmp();
      break;
    case "Update an employee role":
      updateEmpRole();
      break;
    case "View employees by department":
      viewEmpByDept();
      break;
    case "View the budget for a department":
      viewBudget();
      break;
  
//Closes the database
    case "Exit":
    console.log("Server disconnected...");
      process.exit();
      default:
    console.log("Did not work");
      break;
}});
};
  
// Function to view all departments
function viewAlldepts() {
  db.query("SELECT * FROM dept_tbl", (err, results) => {
    if (err) {
    console.log(`Error, retrieving departments...`);
  
//Process the results and display the departments
} else {
    console.table(results);
    inquirer.prompt(pause).then(() => {

askQ();
});
}});
};

  
// Function to view all roles
function viewAllroles() {
  db.query("SELECT * FROM role_tbl", (err, results) => {
    if (err) {
    console.log(`Error, retrieving roles...`);
    inquirer.prompt(pause).then(() => {
      
askQ();
});
  
//Process the results and display the roles
} else {
    console.table(results);
    inquirer.prompt(pause).then(() => {
      
askQ();
});
}});
};
  
// Function to view all employees
function viewAllemployees() {
  db.query(
    `SELECT 
    emp_tbl.id AS 'Employee #',
    CONCAT(emp_tbl.first_name," ",emp_tbl.last_name)AS Employee,
    role_tbl.title AS Occupation,
    manager_id AS Manager
    FROM emp_tbl
    INNER JOIN role_tbl ON emp_tbl.role_id = role_tbl.id`,
      (err, results) => {
        if (err) {
          console.log(`Error retrieving employees...`);
          inquirer.prompt(pause).then(() => {
askQ();
});
        
        } else {
          console.table(results);
          inquirer.prompt(pause).then(() => {
askQ();
});
}});
};
  
// Function to add a department
function addDept() {
  inquirer.prompt(addDeptQuest).then((ans) => {
  const insDept = ans.newDept;
    db.query(
      `INSERT INTO dept_tbl(dept_name) VALUES (?);`,
      insDept,
      (err, results) => {
        if (err) {
          console.log(`Error adding dpartment...`);
          inquirer.prompt(pause).then(() => {
askQ();
});
        } else {
          console.log(`\n\x1b[32m${insDept} \x1b[0mhas been added...\n`);
          inquirer.prompt(pause).then(() => {
askQ();
});
}});
});
};
  
// Function to add a role
function addRole() {
  inquirer.prompt(addRoleQuest).then((ans) => {
  const insRole = ans.newRole;
  const insRoleDept = ans.newRoleDept;
  const insRoleSalary = ans.newRoleSalary;
  
db.query(
 `INSERT INTO role_tbl(title, salary, dept_id) VALUES (?,?,?);`,
  [insRole, insRoleSalary, insRoleDept],
  (err, results) => {
  if (err) {
  console.log(`Error adding role...`);
  inquirer.prompt(pause).then(() => {

  askQ();
  });
  } else {
  console.log(`\n\x1b[32m${insRole} \x1b[0mhas been added...\n`);
  inquirer.prompt(pause).then(() => {
  
  askQ();
});
}});
});
};
  
// Function to add an employee
function addEmp() {
  inquirer.prompt(addEmpQuest).then((ans) => {
  const insEmpFirst = ans.newEmpFirst;
  const insEmpLast = ans.newEmpLast;
  const insEmpRole = ans.newEmpRole;
  let insEmpMgr = null;
  const temp = ans.newEmpMgr;
  
  if (temp) {
    insEmpMgr = temp;
}
  db.query(
    `INSERT INTO emp_tbl (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
    [insEmpFirst, insEmpLast, insEmpRole, insEmpMgr],
    (err, results) => {
    if (err) {
      console.log(`Error adding employee...`);
      inquirer.prompt(pause).then(() => {
askQ();
});
    } else {
      console.log(
      `\n\x1b[32m${insEmpFirst} ${insEmpLast}\x1b[0m has been added...\n`);
      inquirer.prompt(pause).then(() => {
askQ();
});
}});
});
};
  
// Function to update employee role
function updateEmpRole() {
  inquirer.prompt(updEmpRoleQuest).then((ans) => {
  const upEmp = ans.empToUpd;
  const upEmpRole = ans.updRole;
  db.query(
    `UPDATE emp_tbl SET role_id = ? WHERE emp_tbl.id = ?;`,
    [upEmpRole, upEmp],
    (err, results) => {
    if (err) {
      console.log(`Error updating role...`);
      inquirer.prompt(pause).then(() => {
askQ();
});
    } else {
    console.log(`\nThe employee's role updated...\n`);
    inquirer.prompt(pause).then(() => {
askQ();
});
}});
});
};
  
// Function to view employess by department
function viewEmpByDept() {
  inquirer.prompt(whichDeptQuest).then((ans) => {
  const whichDept = ans.whichDept;
  
  db.query(
    `SELECT emp_tbl.first_name,emp_tbl.last_name,dept_tbl.dept_name
    FROM emp_tbl 
    JOIN role_tbl ON  emp_tbl.role_id = role_tbl.id 
    JOIN dept_tbl ON  role_tbl.dept_id = dept_tbl.id
    WHERE dept_tbl.id = ?;`,
      whichDept,
      (err, results) => {
      if (err) {
        console.log(`The table failed to generate...`);
        inquirer.prompt(pause).then(() => {
askQ();
});
      } else {
      if (results.length === 0) {
        console.log("This department has no employees...");
        inquirer.prompt(pause).then(() => {
askQ();
});
      } else {
        console.table(results);
        inquirer.prompt(pause).then(() => {
askQ();
});
}}});
});
};
  