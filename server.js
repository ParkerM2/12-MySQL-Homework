
var express = require("express");
var mysql = require("mysql");
const inquirer = require("inquirer");
var orm = require("./config/orm.js");
var app = express();
var connection = require("./config/connection.js");
// const { viewEmployeeByManager, viewAllEmployees } = require("./config/orm.js");
var PORT = 8000;
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize("mysql");


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

// function callDB () {
//     orm.viewCurrentDB("company", function (result) {
//         var data = result;
//         console.log("Data retrieved from the DATABASE")
//     })
// };

orm.before();

// function updateEmployeeRole() {
//     callDB(data);
//     console.log(data);
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "What is the ID of the employee would you like to update roles?",
//             name: "employees_id"
//         },
//         {
//             type: "input",
//             message: "What role would you like to give them?",
//             name: "roles"
//         }
//     ]).then(answers => {
//         const { employees_id, roles } = answers;
//         orm.updateEmployeeRole(employees_id, roles, function (result) {
//             // var data = result;
//             // console.log("Results : ", data)
//         })
//     })
// };
