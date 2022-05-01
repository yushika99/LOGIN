const sql = require("./db.js");


const Hr_attendance = function(emp_leave) {

  this.Emp_id = emp_leave.Emp_id;
  this.type = emp_leave.type;
  this.month = emp_leave.month;

};

Hr_attendance.create = (newCustomer, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO emp_leave SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};


Hr_attendance.getAll = result => {
  sql.query("SELECT * FROM emp_leave", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employees : ", res);
    result(null, res);
  });
};
module.exports = Hr_attendance;