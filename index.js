const inquirer = require('inquirer');
const mysql = require('mysql2');

//This brings in dotenv so I can use an .env file
require('dotenv').config();

//Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password but now I'm using .env because I'm that cool
    password: process.env.DB_PASSWORD,
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Query database
// db.query('SELECT * FROM tableName', (err, results) => {
//   console.log(results);
// });


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
          console.log('Add en Employee');
          break;
      case 'Update an Employee Role':
          console.log('Update an Employee Role');
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
  db.query('SELECT * FROM department', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    manageCompany ();
  });
}

function viewAllRoles () {
  db.query('SELECT * FROM role_tb', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    manageCompany ();
  });

}

function viewAllEmployees () {
  db.query('SELECT employee.id_employee, employee.first_name, employee.last_name, role_tb.title, role_tb.salary FROM employee INNER JOIN role_tb ON employee.role_id = role_tb.id_role', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    manageCompany ();
  });

}

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
      type: 'input',
      message: 'Please enter the department id of this new role.',
      name: 'newRoleDepartmentId',
      //validation can go here
    },
  ])
  .then((data) => {
    let newRoleName = data.newRoleName;
    let newRoleSalary = data.newRoleSalary;
    let newRoleDepartmentId = data.newRoleDepartmentId;

    // console.log("newRoleName: ",data.newRoleName);
    // console.log("newRoleSalary: ",data.newRoleSalary);
    // console.log("newRoleDepartmentId: ",data.newRoleDepartmentId);

    db.query('INSERT INTO role_tb (title, salary, department_id ) VALUES (?,?,?);', [newRoleName, newRoleSalary, newRoleDepartmentId], (err, result) => {
      if (err) {
        console.log(err);
      }
     manageCompany ();
    });  // This closes the db interaction 
  });
}


function addAnEmployee () {
  // inquirer function to add the needed information

  // add of this I will have an array of objects

  // .then((data)) => {

  //   //INSERT
  //   INSERT INTO employee (first_name, last_name)
  //   VALUES
  //     (varibaleinputfirstname, varibale input for last name);

  //   INSERT INTO role (title, salary, department_id)
  //   VALUES
  //     (variablestitle, salaryvariable, depavariable);
  // });

}

function updateEmployeeRole () {
  //run inquirer prompts to collect the information to to update the rol

  //UPDAte
}


//Need to call the program to start it
manageCompany ();