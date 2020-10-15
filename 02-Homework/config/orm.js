var connection = require("./connection.js");
// orm object to store methods for the command line application to reference to 'add departments, roles, employees', 'view departments, roles, employees', 'update employee roles'
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}
var orm = {
    addToCompanyDB: function (table, department, roles, employees, cb) {
        queryString = "INSERT INTO " + table + " (department, roles, employees) Values (?, ? , ?)";
        connection.query(queryString,[department, roles, employees], function (err, result) {
            if (err) { throw err };

            cb(result)
        });
    },
    viewCurrentDB: function (table, cb) {
        queryString = "SELECT * FROM " + table;
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            
            cb(result)
        });
    },
    updateEmployeeRole: function (employees_id, roles, cb) {
        queryString = "UPDATE company SET roles='" + roles + "' WHERE id='" + employees_id + "'"; 
        connection.query(queryString, function (err, result) {
            if (err) { throw err };
            cb(result);
        });
    }

};
module.exports = orm;