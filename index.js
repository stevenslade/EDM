const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'classlist_db'  //Need to update to my database 
  },
  console.log(`Connected to the classlist_db database.`)  //update db name
);

// Query database
db.query('SELECT * FROM tableName', function (err, results) {
  console.log(results);
});


function manageCompany () {
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: ['View All Departments', 'View all Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role' ],
    },
  ])
  .then((data) => {
    console.log(data.mainMenu);
    let userChoice = data.mainMenu;
  
    //SWITCH CASE DEPEDNING ON MAINMENU VALUE

switch (userChoice) {
  case 'View All Departments':
    console.log('Look at all those departments');
    break;
  case 'View all Roles':
    console.log('So many roles from which to choose');
    break;
    case 'View All Employees':
      console.log('Do we really need this many people');
      break;
    case 'Add a Department':
      console.log('Grow the business, add a department');
      break;
      case 'Add a Role':
    console.log('Add a Role');
    break;
    case 'Add an Employee':
      console.log('Add en Employee');
      break;
    case 'Update an Employee Role':
      console.log('Update an Employee Role');
      break;
  default:
    console.log('something went wrong');
    break;
}


    //RUN A FUNCTION

    //Case of Add employee
      //

    //CASE of UPDATE ROLE
      //RUN my update Role function
    
  });
}

function ViewALLEMployess () {
  //SELECT CONTENT THAT DISPLAY THE JOINED TABLE

  //RUN manage Employees again
}

function AddAnEmployee () {
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