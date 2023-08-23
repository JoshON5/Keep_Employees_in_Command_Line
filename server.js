const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer")
const PORT = process.env.PORT || 3001;
const app = express();
const { viewAllEmployees } = require("./lib/queries")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'RunSqlPl5$',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

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
          "Exit"
          ]
      }
    ])
    .then((answers) => {
      switch(answers.choices) {
        case "View All Empoyees":
          viewAllEmployees()
          break;
      }
});
};