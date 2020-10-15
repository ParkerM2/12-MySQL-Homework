
var express = require("express");
var mysql = require("mysql");
const inquirer = require("inquirer");
var orm = require("./config/orm.js");
var app = express();
var connection = require("./config/connection.js");
var PORT = 8080;


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

// function for CLI APP Prompt
function promptCompanyDB() {
    return inquirer.prompt([
        {
            type: "list",
            message: "Would you like to Add, View, or Update the Company DB?",
            name: "answer",
            choices: [
                "Add Departments, Roles, Employees",
                "View Departments, Roles, Employees",
                "Update Employee Roles",
            ]
        }

    ]).then(result => {
        switch (result.answer) {
            case 'Add Departments, Roles, Employees':
                addToDB();
                break;
            case 'View Departments, Roles, Employees':
                viewDB();
                break;
            case 'Update Employee Roles':
                updateEmployeeRole();
                break;
            default:
                console.log("You must select one!")
                promptCompanyDB();
        };
    })
}
promptCompanyDB();

// function to call the orm for adding to the db
function addToDB() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter The Department you would like to Add",
            name: "department"
        },
        {
            type: "input",
            message: "Enter the roles you would like to Add",
            name: "roles"
        },
        {
            type: "input",
            message: "Enter the employee(s) you would like to Add",
            name: "employees"
        }
    ]).then(answers => {
        console.log("The answers from addToDB prompt! ", answers)
        const { department, roles, employees } = answers;
        orm.addToCompanyDB("company", department, roles, employees, function (result) {
            var data = result;
            console.log("Data Sent to the DATABASE", data);
        })
    })
};

function viewDB() {
    orm.viewCurrentDB("company", function (result) {
        var data = result;
        console.log("Data retrieved from the DATABASE")
        console.table(data)
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the employee would you like to update roles?",
            name: "employees_id"
        },
        {
            type: "input",
            message: "What role would you like to give them?",
            name: "roles"
        }
    ]).then(answers => {
        const { employees_id, roles } = answers;
        orm.updateEmployeeRole(employees_id, roles, function (result) {
            var data = result;
            console.log("Results : ", data)
        })
    })
}
