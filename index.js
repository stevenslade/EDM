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


function manageEmployees () {
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: ['View All Employees', 'Add Employee'],
    },
  ])
  .then((data) => {
    //SWITCH CASE DEPEDNING ON MAINMENU VALUE
    //RUN A FUNCTION

    //Case of Add employee
      //

    //CASE of UPDATE ROLE
      //RUN my update Role function
    
    );
}

function ViewALLEMployess () {
  //SELECT CONTENT THAT DISPLAY THE JOINED TABLE

  //RUN manage Employees again
}

function AddAnEmployee () {
  // inquirer function to add the needed information

  // add of this I will have an array of objects

  .then((data)) => {

    //INSERT
    INSERT INTO employee (first_name, last_name)
    VALUES
      (varibaleinputfirstname, varibale input for last name);

    INSERT INTO role (title, salary, department_id)
    VALUES
      (variablestitle, salaryvariable, depavariable);
  }

}

function updateEmployeeRole () {
  //run inquirer prompts to collect the information to to update the rol

  //UPDAte


}



//Need to call the program to start it
manageEmployees ();