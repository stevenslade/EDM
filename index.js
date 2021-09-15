const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//This brings in dotenv so I can use an .env file
require('dotenv').config();

//Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password but now I'm using .env
    password: process.env.DB_PASSWORD,
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

function manageCompany () {
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: ['View All Departments', 'View all Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit' ],
    },
  ])
  .then((data) => {
    console.log(data.mainMenu);
    let userChoice = data.mainMenu;
    //SWITCH CASE DEPEDNING ON MAINMENU VALUE
    switch (userChoice) {
      case 'View All Departments':
        console.log('Look at all those departments');
        viewAllDepartments();
        break;
      case 'View all Roles':
        console.log('So many roles from which to choose');
        viewAllRoles ();
        break;
      case 'View All Employees':
        console.log('Do we really need this many people');
        viewAllEmployees ();
        break;
      case 'Add a Department':
        console.log('Grow the business, add a department');
        addADepartment();
        break;
      case 'Add a Role':
        addARole ();
        break;
      case 'Add an Employee':
        addAnEmployee ();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole ();
        break;
      case 'Exit':
        console.log('Thanks for using EDM and have a nice day!');
        process.exit();
        break;
      default:
        console.log('something went wrong');
        break;
    }
  });
}

// Query database
// db.query('SELECT * FROM tableName', (err, results) => {
//   console.log(results);
// });

function viewAllDepartments () {
  db.query('SELECT department.id_dept "ID", department.dep_name "Department" FROM department', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    manageCompany ();
  });
}

function viewAllRoles () {
  db.query('SELECT role_tb.id_role "Role ID", role_tb.title "Title", role_tb.salary "Salary", department.dep_name "Department" FROM role_tb JOIN department ON role_tb.department_id = department.id_dept', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    manageCompany ();
  });

}

function viewAllEmployees () {

  // db.query('SELECT employee.id_employee, employee.first_name, employee.last_name FROM employee JOIN employee ON employee.manager_id = employee.id_employee', (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.table(result);
  //   manageCompany ();
  // });

  //This delivers everything but the managers name commented out to work on the above query
    db.query('SELECT employee.id_employee, employee.first_name, employee.last_name, role_tb.title, department.dep_name, role_tb.salary FROM employee LEFT JOIN role_tb ON employee.role_id = role_tb.id_role LEFT JOIN department ON role_tb.department_id = department.id_dept', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    manageCompany ();
  });
}

//This sttaement was an attempt to link the manager name to the table
//'SELECT employee.id_employee, employee.first_name, employee.last_name, role_tb.title, department.dep_name, role_tb.salary CONCAT(manager_id.first_name, manager_id.last_name) AS manager FROM employee LEFT JOIN role_tb ON employee.role_id = role_tb.id_role LEFT JOIN department ON role_tb.department_id = department.id_dept LEFT JOIN employee manager ON manager_id = employee.manager_id'

//This statement worked and gave me everything but the manager name
// 'SELECT * FROM employee LEFT JOIN role_tb ON employee.role_id = role_tb.id_role LEFT JOIN department ON role_tb.department_id = department.id_dept'

//this statement was working but lacked departments and managers
// SELECT employee.id_employee, employee.first_name, employee.last_name, role_tb.title, role_tb.salary FROM employee INNER JOIN role_tb ON employee.role_id = role_tb.id_role

//Reference code from docs
//   SELECT * FROM table1 LEFT JOIN table2 ON table1.id = table2.id
//      LEFT JOIN table3 ON table2.id = table3.id;

function addADepartment () {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Please enter name of department to add.',
      name: 'newDepartment',
      //validation can go here
    },
  ])
  .then((data) => {
    let newDepartmentName = data.newDepartment;

    db.query('INSERT INTO department (dep_name) VALUES (?);', newDepartmentName, (err, result) => {
      if (err) {
        console.log(err);
      }
      //console.log(result);
      manageCompany ();
    });
  });
}

function addARole () {
  getDepartments();
}

function getDepartments () {
  db.query('SELECT department.dep_name FROM department', (err, result) => {
    if (err) {
      console.log(err);
    }
    let deptList = [];
    for (let i=0; i<result.length; i++) {
      deptList.push(result[i].dep_name)
    }
  collectRoleData(deptList);
  });
}

function collectRoleData (deptList) {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Please enter the name of the new role.',
      name: 'newRoleName',
      //validation can go here
    },
    {
      type: 'input',
      message: 'Please enter the salary of this position.',
      name: 'newRoleSalary',
      //validation can go here
    },
    {
      type: 'list',
      message: 'Please select the department id of this new role.',
      name: 'newRoleDepartment',
      choices: deptList
    },
  ])
  .then((data) => {
    let newRoleName = data.newRoleName;
    let newRoleSalary = data.newRoleSalary;
    let newRoleDepartment = data.newRoleDepartment;
    let newRoleDepartmentId = 0;

    // Need to turn newRoleDepartmentID into a number
    db.query(`SELECT id_dept FROM department WHERE dep_name = ?`, newRoleDepartment ,(err, result) => {
      if (err) {
        console.log(err);
      }
      console.log('department id:', result);
      newRoleDepartmentId = result[0].id_dept;
      console.log(newRoleDepartmentId);
      insertNewRole (newRoleName, newRoleSalary, newRoleDepartmentId);
    });
  });
}

function insertNewRole (newRoleName, newRoleSalary, newRoleDepartmentId) {
  db.query('INSERT INTO role_tb (title, salary, department_id ) VALUES (?,?,?);', [newRoleName, newRoleSalary, newRoleDepartmentId], (err, result) => {
    if (err) {
      console.log(err);
    }
   manageCompany ();
  });
}

function addAnEmployee () {
  // need a function to find the roles
  // let roles = findRoles ();
  // console.log('roles: ', roles);
  db.query('SELECT title FROM role_tb', (err, results) => {
    let roleArray =[];
    for(let i =0; i <results.length; i ++){
     roleArray.push(results[i].title);
    }
    //call the next function?
    getEmployeeInfo(roleArray);
  });
  // need a function to find the managers
  // need an inquire function to collect firstname and last name and give options for roles and manager
}

function getEmployeeInfo (roleArray) {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Please enter the first name of the new employee.',
      name: 'newEmpFirst',
      //validation can go here
    },
    {
      type: 'input',
      message: 'Please enter the last name of the new employee.',
      name: 'newEmpSecond',
      //validation can go here
    },
    {
      type: 'list',
      message: 'Please select the role of the new employee.',
      name: 'newEmpRole',
      choices: roleArray,
      //validation can go here
    },
    {
      type: 'input',
      message: "Please select the new employee's manager.",
      name: 'newEmpManager',
      //validation can go here
    },
  ])
  .then((data) => {
    let newEmpFirst = data.newEmpFirst;
    let newEmpSecond = data.newEmpSecond;
    let newEmpRole = data.newEmpRole;
    let newEmpManager = data.newEmpManager;

    let newEmpManager =1;

    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?,?,?,?);', [newEmpFirst, newEmpSecond, newEmpRole, newEmpManager], (err, result) => {
      if (err) {
        console.log(err);
      }
     manageCompany ();
    });
  });
}

function updateEmployeeRole () {
  // First we need a list of current employees

  db.query('SELECT employee.id_employee, employee.first_name, employee.last_name FROM employee', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("result from SELECT employee:", result);  // This is a list of employees first and last names and employee id
    //iterate over employee list building an individual array
    let currentEmployeeArray =[];
    let currentEmployeeString ="";
    let employeeList = [];
    for (let i=0; i< result.length; i++) {
      currentEmployeeArray =[];
      currentEmployeeArray.push(result[i].id_employee);
      currentEmployeeArray.push(result[i].first_name);
      currentEmployeeArray.push(result[i].last_name);

      currentEmployeeString = result[i].id_employee + " " + result[i].first_name + " " + result[i].last_name;
      //employeeList.push(currentEmployeeArray);
      employeeList.push(currentEmployeeString);
    }
    //console.log(currentEmployeeString);
    console.log('employeeList ', employeeList);
    determineEmployee (employeeList);
  });
}

function determineEmployee (employeeList) {
  //Find out which employee to update
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'Which employee would you like to update',
      name: 'selectedEmployee',
      choices: employeeList,
    },
  ])
  .then((data) => {
    console.log(data.selectedEmployee);
    console.log('Selected Employees ID: ', data.selectedEmployee[0]);
    
    manageCompany ();
  });
}


//Need to call the program to start it
manageCompany ();