const { validate } = require("uuid");
const db = require("../config/connection");
const inquirer = require("inquirer");

const addEmployee = () => {
    return new Promise ((resolve, reject) => {
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "what is the employee's first name?",
                validate: firstName => {
                    if (firstName) {
                        return true;
                    } else {
                        console.log("Please enter in valid first name.")
                        return false 
                    }
                }
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the employee?",
                validate: lastName => {
                    if (lastName) {
                        return true
                    } else {
                        console.log("Failed to enter a correct last name.")
                        return false
                    }
                }
            }
        ])
        .then(answer => {
            const newEmp = [answer.firstName, answer.lastName]
            const roleSql = `SELECT role.id, role.title FROM role`;
            db.query(roleSql, (err, res) => {
                if (err) throw err;
                const roles = res.map(({ id, title }) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        type:"list",
                        name: "role",
                        message:"What is the employees role?",
                        choices: roles
                    }
                ]).then(roleChoice => {
                    const role = roleChoice.role;
                    newEmp.push(role);
                    const managerSql = `SELECT * FROM employee`;
    
                    db.query(managerSql, (err, res) => {
                        if (err) throw err;
                        const managers = res.map(({ id, first_name, last_name }) => 
                            ({ name: first_name + ' ' + last_name, value: id }))
                        inquirer.prompt([
                            {
                                type:"list",
                                name: "manager",
                                message: "Who is the employee's manager",
                                choices: managers
                            }
                        ])
                        .then(managerChoice => {
                            const manager = managerChoice.manager;
                            newEmp.push(manager);
                            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                            db.query(sql, newEmp, (err) => {
                                if (err) {
                                    reject(err);
                                    return
                                }
                                console.log("Employee has been added!")
                                resolve();
                            });
                        });
                    });
                });
            });
        });
    })

};

const addDepartment = () => {
    return new Promise ((resolve, reject) => {
        inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "What is the name of your new Department?",
                validate: validate.validateString
            }
        ]).then((answer) => {
            let sql = `INSERT INTO department (name) VALUES (?)`;
            db.query(sql, answer.newDepartment, (err) => {
                if (err) {
                    reject(err);
                    return
                }
                console.log("Department has been added!")
                resolve();
            });
        });
    });
};

const addRole = () => {
    return new Promise ((resolve, reject) => {
        const sql = "SELECT * FROM department"
        db.query(sql, (err, res) => {
            if (err) throw err;
            let departmentArray = [];
            res.forEach((department) => {departmentArray.push(department.name)})
                departmentArray.push('Edit Department');
                inquirer.prompt([
                    {
                        type: "list",
                        name: "editDepartment",
                        message: "Which department do you want to add a role to?",
                        choices: departmentArray
                    }
                ])
                .then((answer) => {
                    if (answer.editDepartment === 'Edit Department') {
                        this.addDepartment()
                    } else {
                        addDepartmentRole(answer);
                    }
                });
                const addDepartmentRole = (departmentRole) => {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newRole",
                            message: "What is the name of your new role?",
                            validate: validate.validateString
                        },
                        {
                            type: "input",
                            name: "salary",
                            message: "What is the salary of this new role?",
                            validate: validate.validateSalary
                        }
                    ]).then((answer => {
                        let newRole = answer.newRole;
                        let departmentId;

                        res.forEach((department) => {
                            if (departmentRole.editDepartment === department.name) {departmentId = department.id;}
                        });
                        let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                        let promptRole = [newRole, answer.salary, departmentId];

                        db.query(sql, promptRole, (err) => {
                            if (err) {
                                reject(err);
                                return
                            }
                            console.log("Role has been created!");
                            resolve();
                        });
                    }));
                };
            });
        });
    };

module.exports = { addEmployee, addDepartment, addRole }