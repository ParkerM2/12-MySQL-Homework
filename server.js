
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

function callDB () {
    orm.viewCurrentDB("company", function (result) {
        var data = result;
        console.log("Data retrieved from the DATABASE")
    })
};
// function for CLI APP Prompt
function promptCompanyDB() {
    return inquirer.prompt([
        {
            type: "list",
            message: "Would you like to do??",
            name: "answer",
            choices: [
                "View DB",
                "View all Employees",
                "View all Employees by Manager",
                "View all Employees by Department",
                "Add Departments",
                "Add Roles",
                "Add Employees",
                "Update Employee Roles",
            ]
        }

    ]).then(result => {
        switch (result.answer) {
            case 'Add Departments, Roles, Employees':
                addToDB();
                break;
            case 'View Departments, Roles, Employees':
                // orm.func
                viewDB();
                break;
            case 'View all Employees':
                // orm.func?
                viewAllEmployees();
                break;
            case 'View all Employees by Manager':
                // orm.function?
                break;
            case 'View all Employees by Department':
                //orm.func?
                break;
            case 'Add Departments':
                //orm
                break;
            case 'Add Roles':
                break;
            case 'Add Employees':
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                break;
            case 'Remove Employee':
                break;
            default:
                console.log("You must select one!")
                promptCompanyDB();
        };
    })
};
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
        promptCompanyDB()
    })
};

function updateEmployeeRole() {
    callDB(data);
    console.log(data);
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
            // var data = result;
            // console.log("Results : ", data)
        })
    })
};
