INSERT INTO department (dep_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Quality"),
       ("Production");

INSERT INTO role_tb (title, salary, department_id)
VALUES ("Salesman", 90000, 1),
       ("Software Engineer", 80000, 2),
       ("Quality Engineer", 120000, 3),
       ("Manager", 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Lumbergh", 4),
       ("Peter", "Gibbons", 2, 1);

