const sql = require("./db.js");

// constructor
const Hr = function(emp) {
  this.fullname = emp.fullname;
  this.phonenumber = emp.phonenumber;
  this.email = emp.email;
  this.address = emp.address;
  this.department = emp.department;
  this.position = emp.position;
};

Hr.create = (newCustomer, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO employee SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Hr.findById = (empid, result) => {
  sql.query(`SELECT * FROM employee WHERE empid = '${empid}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Hr.getAll = result => {
  sql.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employees : ", res);
    result(null, res);
  });
};

Hr.getAll_sal = result => {
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

Hr.getAll_att = result => {
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

Hr.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE employee SET fullname = ?, phonenumber = ?, address = ?, department = ?, position = ? WHERE empid = ?",
    [customer.fullname, customer.phonenumber, customer.address, customer.department, customer.position , id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Hr.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Hr.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Hr;
