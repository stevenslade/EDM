INSERT INTO department (dep_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role_tb (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Sales Person", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 100000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Laywer", 190000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Lumbergh", 3, null),
       ("Peter", "Gibbons", 2, 1),
       ("Michael", "Bolton", 2, 1),
       ("Anne", "Wenworth", 1, 1),
       ("Milton", "Millsworth", 7, null),
       ("Larry", "Lawson", 8, 5);

