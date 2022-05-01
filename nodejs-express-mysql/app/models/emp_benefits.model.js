const sql = require("./db.js");


const Emp_benefits = function(emp) {

  this.Emp_id = emp.Emp_id;
  this.basic_sal = emp.basic_sal;
  this.month = emp.month;
  this.allowance = emp.allowance;
};

Emp_benefits.create = (newCustomer, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO emp_benefits SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};


Emp_benefits.getAll = result => {
  sql.query("SELECT * FROM emp_benefits", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employees : ", res);
    result(null, res);
  });
};
module.exports = Emp_benefits;