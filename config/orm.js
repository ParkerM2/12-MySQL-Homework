var connection = require("./connection.js");
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize("mysql");
var inquirer = require("inquirer");
// orm object to store methods for the command line application to reference to 'add departments, roles, employees', 'view departments, roles, employees', 'update employee roles'
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}
var orm = {
    before: function (table, cb) {
        orm.all(table, cb)
    },
    
    prompt: function () {
        inquirer.prompt([
            {
                type: "list",
                message: "Would you like to do??",
                name: "answer",
                choices: [
                    "Add Departments, Roles, Employees",
                    "View Departments, Roles, Employees",
                    "View all Employees",
                    "View all Employees by Manager",
                    "View all Employees by Department",
                    "Add Departments",
                    "Add Roles",
                    "Add Employees",
                    "Update Employee Roles",
                    "Remove Employee",
                ]
            }
        ]).then(result => {
            
            switch (result.answer) {
                case 'Add Departments, Roles, Employees':
                    orm.addToCompanyDB();
                    break;
                case 'View Departments, Roles, Employees':
                    // orm.func
                    orm.viewCurrentDB("company")
                    break;
                case 'View all Employees':
                    // orm.func?
                    // viewEmployees();
                    orm.viewAllEmployees();
                    break;
                case 'View all Employees by Manager':
                    // orm.function
                    orm.viewEmployeeByManager();
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
                    orm.removeEmployee();
                    break;
                default:
                    console.log("You must select one!")
                // promptCompanyDB();
            };
        });
    },

    // selects all from the company database
    all: function (table) {
        table = "company";
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            console.table(result)
            orm.prompt()
        })
        
    },
    // takes in 3 prompts and adds the 'department', 'roles', and 'employees' fields.
    addToCompanyDB: function () {
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
                message: "Enter the employee's first name :",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter the employee's last name :",
                name: "last_name"
            },
            {
                type: "input",
                message: "Enter the employee's Salary :",
                name: "salary"
            },
        ]).then(answers => {
            console.table(answers)
            const { department, roles, first_name, last_name, salary } = answers;

            queryString = "INSERT INTO company (department, roles, first_name, last_name, salary) Values (?, ?, ? , ?, ?)";
            connection.query(queryString, [department, roles, first_name, last_name, salary], function (err, result) {
                if (err) { throw err };
                console.log("This employee has been added to the company database")
            });
            orm.prompt();
        });
       
    },
    viewCurrentDB: function (table) {
        queryString = "SELECT * FROM " + table;
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            
            console.table(result)
            console.log("ALL RESULTS FROM company")
            orm.prompt();
        });
    },
    updateEmployeeRole: function (employees_id, roles) {
        queryString = "UPDATE company SET roles='" + roles + "' WHERE id='" + employees_id + "'";
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            console.log(result);
        });
    },
    viewAllEmployees: function (cb) {
        queryString = "SELECT first_name, last_name FROM company";
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            console.table(result);
        });
        
    },
    viewEmployeeByManager: function (manager) {
        queryString = " SELECT * from company(first_name, last_name) WHERE manager(?)", [manager];
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            console.log(result); df
        });
    },
    // choices: async function () {
    //     connection.query("SELECT first_name, last_name FROM company", function (err, result) {
    //         if (err) { throw err };
    //         var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
    //         console.log(resultArray)
    //         return resultArray;
    //     });
    // },
    removeEmployee: function () {
            connection.query("SELECT first_name FROM company", function (err, result) {
                if (err) { throw err };
                var data = result;
                var resultArray = []
                data.map(item => {
                    data = JSON.parse(JSON.stringify(item.first_name));
                    resultArray.push(data)
                });
                console.log(resultArray)
                inquirer.prompt([
                    {
                        type: "list",
                        message: "Choose Which Employee you would like to remove",
                        choices: resultArray,
                        name: "first_name"
                    },
                    {
                        type: "list",
                        message: "Choose the Employees last name",
                        choices: resultArray,
                        name: "last_name"
                    }
                ]).then(answers => {
                    // console.log(answers)
                })
            })
        }
}

module.exports = orm;
