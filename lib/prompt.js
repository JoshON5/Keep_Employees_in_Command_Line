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

module.exports = { addEmployee }