const inquirer = require('inquirer');
const fs = require('fs/promises');
const express = require('express');
const mysql = require('mysql2');
const { questions,addDeptmark, addRolemark, addEmpmark, updEmproleMark, viewBudgetmark, whichDeptmark, pause } = require('./util/questions');
const app = express();
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
inquirer.prompt(questions).then((ans) => {
  switch(ans.task){
case "View departments": 
      viewAlldepts();
    break;
case 'View roles': 
      viewAllroles();
    break;
case 'View employees': 
      viewAllemps();
    break;
case 'Add a department': 
      addNewdept();
    break;
case 'Add a role': 
      addNewrole();
    break;
case 'Add an Employee': 
      addNewemp();
    break;
case 'Update an employee role':
      updateEmpRole();
    break;
case 'View employees by department':
      viewEmpByDept();
    break;
case 'View the budget for a department':
      viewBudget();
    break;

//Closes the database  
case 'Exit': 
  console.log("Server disconnected...");
  process.exit();
default:
  console.log("Did not work");
    break;
}})};

// Function to view all departments
function viewAlldepts() {
  db.query('SELECT * FROM dept_tabl', (err, results) => {
if (err) {
      console.log(`Error, retrieving departments...`);

//Process the results and display the departments
} else {
      console.table(results);
      inquirer.prompt(pause).then(() => {

askQ()});
}})};

// Function to view all roles
function viewAllroles() {
  db.query('SELECT * FROM role_tabl', (err, results) => {
if (err) {
    console.log(`Error, retrieving roles...`);
    inquirer.prompt(pause).then(() => {

askQ()});

//Process the results and display the roles            
} else {
    console.table(results);
    inquirer.prompt(pause).then(() => {

askQ()});
}})};

// Function to view all employees
function viewAllemps() {
  db.query
  (`SELECT emp_tabl.id AS 'Employee #', 
  CONCAT(emp_tabl.first_name," ",emp_tabl.last_name)AS Employee, 
  role_tabl.title AS Occupation, manager_id AS Manager
  FROM emp_tabl INNER JOIN role_tabl ON emp_tabl.role_id = role_tabl.id`, 
(err, results) => {
if (err) {
    console.log(`Error retrieving employees...`);
    inquirer.prompt(pause).then(() => {

askQ()});

//Process the results and display the employees   
} else {
    console.table(results);
    inquirer.prompt(pause).then(() => {

askQ()});
}})};

// Function to add a department
function addNewdept() {
  inquirer.prompt(addDeptmark).then((ans) => {
  const insDept = ans.newDept;
  db.query(`INSERT INTO dept_tabl(dept_name) VALUES (?);`,insDept, (err, results) => {
if (err) {
    console.log(`Error adding dpartment...`);
    inquirer.prompt(pause).then(() => {

askQ()});
} else {
    console.log(`\n\x1b[32m${insDept} \x1b[0mhas been added...\n`);
    inquirer.prompt(pause).then(() => {

askQ()});
}})})};

// Function to add a role
function addNewrole() {
  inquirer.prompt(addRolemark).then((ans) => {
  const insRole = ans.newRole;
  const insRoleDept = ans.newRoleDept;
  const insRoleSalary = ans.newRoleSalary;
  db.query(`INSERT INTO role_tabl(title, salary, dept_id) VALUES (?,?,?);`,
  [insRole,insRoleSalary,insRoleDept], (err, results) => {
if (err) {
    console.log(`Error adding role...`);
    inquirer.prompt(pause).then(() => {

askQ()});
} else {
    console.log(`\n\x1b[32m${insRole} \x1b[0mhas been added...\n`);
    inquirer.prompt(pause).then(() => {

askQ()});
}})})};

// Function to add an employee
function addNewemp() {
  inquirer.prompt(addEmpmark).then((ans) => {
  const insEmpFirst = ans.newEmpFirst;
  const insEmpLast = ans.newEmpLast;
  const insEmpRole = ans.newEmpRole;
  let insEmpMgr = null;
  const temp = ans.newEmpMgr;
if (temp){
    insEmpMgr = temp;
}
  db.query(`INSERT INTO emp_tabl (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
  [insEmpFirst,insEmpLast,insEmpRole,insEmpMgr], (err, results) => {
if (err) {
    console.log(`Error adding employee...`);
    inquirer.prompt(pause).then(() => {

askQ()});
} else {
    console.log(`\n\x1b[32m${insEmpFirst} ${insEmpLast}\x1b[0m has been added...\n`);
    inquirer.prompt(pause).then(() => {

askQ()});
}})})};

// Function to update employee role
function updateEmpRole() {
    inquirer.prompt(updEmproleMark).then((ans) => {
    const upEmp = ans.empToUpd;
    const upEmpRole = ans.updRole;
    db.query(`UPDATE emp_tabl SET role_id = ? WHERE emp_tabl.id = ?;`,
    [upEmpRole,upEmp],(err, results) => {
if (err) {
        console.log(`Error updating role...`);
        inquirer.prompt(pause).then(() => {
                
askQ()});
} else {
        console.log(`\nThe employee's role updated...\n`);
        inquirer.prompt(pause).then(() => {

askQ()});
}})})};

// Function to view employess by department
function viewEmpByDept() {
    inquirer.prompt(whichDeptmark).then((ans) => { 
    const whichDept = ans.whichDept;
    db.query(`SELECT emp_tbl.first_name,emp_tbl.last_name,dept_tbl.dept_name FROM emp_tbl JOIN role_tbl ON emp_tbl.role_id = role_tbl.id 
             JOIN dept_tbl ON  role_tbl.dept_id = dept_tbl.id WHERE dept_tbl.id = ?;`,
             whichDept, (err, results) => {
if (err) {
        console.log(`The table failed to generate...`);
        inquirer.prompt(pause).then(() => {
            
askQ()});
} else {
if (results.length === 0){
        console.log('This department has no employees...');
        inquirer.prompt(pause).then(() => {

askQ()});
} else {
        console.table(results);
        inquirer.prompt(pause).then(() => {

askQ()});
}}})})};


// Function to view budeget
function viewBudget() {
    inquirer.prompt(viewBudgetmark).then((ans) => {
    const budDept = ans.deptBud;
    db.query(`SELECT SUM(salary) AS Budget FROM role_tbl Join emp_tbl on emp_tbl.role_id = role_tbl.id WHERE role_tbl.dept_id = ?;`,
             budDept, (err, results) => {
if (err) {
          console.log(`Error calculating budget. Check your data and try again.`);
          inquirer.prompt(pause).then(() => {
            
askQ()});
} else {
if (!results[0].Budget){
          console.log('This deparment has no budget...')
          inquirer.prompt(pause).then(() => {
askQ()});
} else {
          console.log(`This budget is \$${results[0].Budget}`);
          inquirer.prompt(pause).then(() => {

askQ()});
}}})})};

askQ();