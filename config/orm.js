var connection = require("./connection.js");
var inquirer = require("inquirer");
const { Console } = require("console");
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
        console.log("Current company DB")
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
                    orm.viewAllEmployees();
                    break;
                case 'View all Employees by Manager':
                    // orm.function
                    orm.viewEmployeeByManager();
                    break;
                case 'View all Employees by Department':
                    orm.viewEmployeeByDepartment();
                    break;
                case 'Add Departments':
                    orm.viewAllDepartments();
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
    viewCurrentDB: async function (table) {
        queryString = "SELECT * FROM " + table;
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            
            console.table(result)
            console.log("ALL RESULTS FROM company")
            orm.before();
        });
    },
    updateEmployeeRole: async function (employees_id, roles) {
        queryString = "UPDATE company SET roles='" + roles + "' WHERE id='" + employees_id + "'";
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            console.log(result);
        });
    },
    viewAllEmployees: function () {
        queryString = "SELECT first_name, last_name FROM company";
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            console.table(result);
            orm.prompt();
        });
    },
    viewAllDepartments: function () {
        queryString = "SELECT department FROM company";
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            console.table(result);
            orm.prompt();
        })
    },
    viewEmployeeByManager: async function () {
        connection.query("SELECT manager FROM company", function (err, result) {
            if (err) { throw err };
            var data = result
            var managers = [];
            data.map(item => { data = JSON.parse(JSON.stringify(item)); managers.push(data) });
            console.log(managers[0].manager) 
            let updatedManagers = [];
            updatedManagers.push(managers[0].manager)
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which manager would you like to search by?",
                    choices: updatedManagers,
                    name: "manager",
                }
            ]).then(manager => {
                queryString = "SELECT FROM company WHERE manager='" + manager + "'";
                connection.query(queryString, [manager], function (err, result) {
                    if (err) { throw err };
                    var data = result;
                    console.table(data)
                    // data.map(item => {
                    //     data = JSON.parse(JSON.stringify(item));
                    //     console.table(data);
                    // });
                    
                })
            });
        
        });
    },
    removeEmployee: async function () {
        connection.query("SELECT first_name, last_name FROM company", function (err, result) {
            if (err) { throw err };
            let nameArray = [];
            var data = result;
            data.map(item => {
                data = JSON.parse(JSON.stringify(item.first_name + " " + item.last_name));
                nameArray.push(data)
            });
            inquirer.prompt([
                {
                    type: "list",
                    message: "Choose Which Employee you would like to remove",
                    choices: nameArray,
                    name: "name"
                },
            ]).then(answers => {
                console.log(answers.name, "answers.name")
                var first_name = answers.name.split(" ")
                console.log(first_name, "after");
                connection.query("DELETE FROM company WHERE first_name='" + first_name[0] + "' AND last_name='" + first_name[1] + "'"), function (err, result) {
                    if (err) { throw err } else {
                        console.log("results from delete query")
                        orm.before()
                    };
                };
                orm.before("company");
            });
        });
    },
    viewEmployeeByDepartment: function () {
        connection.query("SELECT department FROM company", function (err, result) {
            if (err) { throw err };
            var data = result
            var departments = [];
            data.map(item => { data = JSON.parse(JSON.stringify(item)); departments.push(data.department) });
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which department would you like to search by?",
                    choices: departments,
                    name: "department",
                }
            ]).then(answer => {
                let department = answer.department;
                let queryString = "SELECT * FROM company WHERE department='" + department + "'";
                connection.query(queryString, [department], function (err, result) {
                    if (err) { throw err };
                    var data =  result;
                    data.map(item => { data = JSON.parse(JSON.stringify(item)); console.table(data); });
                    orm.prompt();
                })
            });
        
        });
    },
}

module.exports = orm;
