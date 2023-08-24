const mysql = require("mysql2");
const inquirer = require("inquirer");
const { viewAllEmployees } = require("./lib/queries");
const db = require("./config/connection")
const cTable = require("console.table")


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
            promptUser()
          }).catch(err => {
            console.error("Error trying to add an employee.", err);
          });
        default:
        return console.log("default")
      }
    })
}
