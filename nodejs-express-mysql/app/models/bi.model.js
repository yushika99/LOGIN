const sql = require("./db.js");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
};

const Meet = function(meet) {
  this.title = meet.title;
  this.Start_time = meet.Start_time;
  this.End_time = meet.End_time;
  this.Attendees - meet.Attendees;
};

User.create = (newCustomer, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO users SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

User.findById = (customerId, result) => {
  sql.query(`SELECT * FROM users WHERE username = '${customerId}'`, (err, res) => {
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

User.findByRange = (range, result) => {
  sql.query(`SELECT YEAR(date) AS year, MONTH(date) AS month, SUM(Total) AS total FROM invoice WHERE date >= DATE_ADD(CURDATE(), INTERVAL -'${range}' DAY) GROUP BY YEAR(date), MONTH(date)`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT YEAR(date) AS year, MONTH(date) AS month, SUM(Total) AS total FROM invoice GROUP BY YEAR(date), MONTH(date)", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.getempper = result => {
  sql.query("SELECT employee.empid, employee.fullname, employee.email, emp_benefits.allowance, emp_benefits.allowance / emp_benefits.basic_sal * 100 AS perc FROM employee INNER JOIN emp_benefits ON employee.empid = emp_benefits.Emp_id WHERE MONTH(emp_benefits.month) = MONTH(CURRENT_DATE()) ORDER BY emp_benefits.allowance / emp_benefits.basic_sal * 100 DESC LIMIT 5", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.getAll_pp = result => {
  sql.query("SELECT Product_type, SUM(quantity) AS qua FROM inventory GROUP BY Product_type", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Meet.getAll_meet = result => {
  sql.query("SELECT * FROM meetings WHERE Start_time >= CURDATE() ORDER BY Start_time DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE users SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
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

User.remove = (id, result) => {
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

User.removeAll = result => {
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

module.exports = User;
//module.exports = Meet;
