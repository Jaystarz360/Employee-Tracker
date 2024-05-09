const question = 

[
{type: 'list',
 name: 'task',
 message: "Please select a task...",
   choices: [{
 name:'View all departments'},
{name:'View all roles'},
{name:'View all employees'},
{name:'Add a department'},
{name:'Add a role'},
{name:'Add an employee'},
{name:'Update an employee role'},
{name:'View employees by department'},
{name:'View the budget for a department'},
{name:'Exit'},
]}
];

const addDeptQuest = [
{type: 'input',
 name: 'newDept',
 message: "Please enter the new department name..."},
];
    
const addRoleQuest = [
{type: 'input',
 name: 'newRole',
 message: "Please enter the new role name..."},
{type: 'input',
 name: 'newRoleDept',
 message: "Please enter the department id this role belongs to..."},
{type: 'input',
 name: 'newRoleSalary',
 message: "Please enter the salary for the new role..."},
];
  

const addEmpQuest = [
{type: 'input',
 name: 'newEmpFirst',
 message: "Please enter the new employee's first name..."},
{type: 'input',
 name: 'newEmpLast',
 message: "Please enter the new employee's last name..."},
{type: 'input',
 name: 'newEmpRole',
 message: "Please enter the role for this employee..."},
{type: 'input',
 name: 'newEmpMgr',
 message: "Please enter the manager id for the new rol(blank if none)...", default: null},
];


const updEmpRoleQuest = [
{type:'input',
 name:'empToUpd',
 message:'Enter employee number to update their role...'},
{type:'input',
 name:'updRole',
 message:'Enter new role for employee...'},
];
  
const viewBudgetQuest = [
{type:'input',
 name:'deptBud',
 message:`Which department's budget would you like to see...`},
];

const whichDeptQuest = [
{type:'input',
 name: 'whichDept',
 message: 'Please enter a department ID to view the employees...'},
];

const pause =[
{type:'input',
 name:'nothing',
message:'Press enter for menu...'},
];
  
module.exports = {
question:question,
addDeptQuest:addDeptQuest,
addRoleQuest:addRoleQuest,
addEmpQuest:addEmpQuest,
updEmpRoleQuest:updEmpRoleQuest,
viewBudgetQuest:viewBudgetQuest,
whichDeptQuest:whichDeptQuest,
pause:pause
};