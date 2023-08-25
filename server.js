const mysql = require("mysql2");
const inquirer = require("inquirer");
const { viewAllEmployees, viewAllDepartments, viewAllRoles } = require("./lib/queries");
const { addEmployee, addDepartment, addRole } = require("./lib/prompt");
const db = require("./config/connection");
const cTable = require("console.table");

db.connect((err) => {
  if (err) throw err;
  console.log("database connected")
  promptUser()
});

const promptUser = () => {
  inquirer.prompt([
      {
        name: "choices",
        type: "list",
        message: "Please select an option:",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit",
          ],
      },
    ])
    .then((answers) => {
      switch(answers.choices) {
        case "View All Employees":
          viewAllEmployees()
          .then(() => {
              promptUser();
          })
          .catch(err => {
              console.error("Error while viewing employees:", err);
          });
          break;
        case "Add Employee":
          addEmployee()
          .then(() => {
            promptUser();
          }).catch(err => {
            console.error("Error in adding an employee.", err)
          });
          break;
        case "Update Employee Role":
          updateEmployeeRole()
          .then(() => {
            promptUser()
          }).catch(err => {
            console.error("Error in updating employee.", err)
          });
          break;
        case "View All Roles":
          viewAllRoles()
          .then(() => {
            promptUser()
          }).catch(err => {
            console.error("Error while viewing roles.", err);
          });
          break;
        case "Add Role":
          addRole()
          .then(() => {
            promptUser()
          }).catch(err => {
            console.error("Error while trying to add a new role.", err);
          });
          break;
        case "View All Departments":
          viewAllDepartments()
          .then(() => {
            promptUser()
          }).catch(err => {
            console.error("Error while viewing all departments.", err);
          });
        break;
        case "Add Department":
          addDepartment()
          .then(() => {
            promptUser()
          }).catch(err => {
            console.error("Error while trying to add a department.", err);
          });
          break;
        case "Exit":
          db.end();
        break;
        default:
        return console.log("default")
      }
    })
}
