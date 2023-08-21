INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 100000, 1),
       ("Sales Team", 75000, 1),
       ("Engineering Manager", 125000, 2),
       ("Enigneer", 80000, 2),
       ("Finance Manager", 145000, 3),
       ("Accountant", 90000, 3),
       ("Legal Lead", 175000, 4),
       ("Paralegal", 92000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kitana", "Anatik", 1, NULL),
       ("Mileena", "Aneelim", 2, 1),
       ("Johnny", "Storm", 3, NULL),
       ("Peter", "Parker", 4, 3),
       ("Bernie", "Madoff", 5, NULL),
       ("Barney", "Dinosaur", 6, 5),
       ("Harvey", "Birdman", 7, NULL),
       ("Tweety", "Bird", 8, 7); 