
var express = require("express");
var mysql = require("mysql");
const inquirer = require("inquirer");
var orm = require("./config/orm.js");
var app = express();
var connection = require("./connection.js");

orm.addToCompanyDB("")

// function for CLI APP Prompt
function promptCompanyDB() {
    return inquirer.prompt([
        {
            type: "Choices",
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
                updateEmployeeRoles();
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
            name: "role"
        },
        {
            type: "input",
            message: "Enter the employee(s) you would like to Add",
            name: "employee"
        }
    ]).then(answers => {
        console.log("The answers from addToDB prompt! ", answers)
        const { department, role, employee } = answers;
        orm.addToCompanyDB("company", department, role, employee)
        console.log("Added", department, role, employee, " to the Company Database");
    })
};