DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id_dept INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(30),
  PRIMARY KEY (id_dept)
);

CREATE TABLE role_tb (
  id_role INT NOT NULL AUTO_INCREMENT,
  title  VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id_role),
  FOREIGN KEY (department_id) REFERENCES department(id_dept)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id_employee INT NOT NULL AUTO_INCREMENT,
  first_name  VARCHAR(30),
  last_name  VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id_employee),
  FOREIGN KEY (role_id) REFERENCES role_tb(id_role)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id_employee)
  ON DELETE SET NULL
);



