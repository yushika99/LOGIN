const sql = require("./db.js");

// constructor
const Cash = function(cash) {
  this.acc_id = cash.acc_id;
  this.name = cash.name;
  this.amount = cash.amount;
  this.date = cash.date;
};

Cash.create = (newCustomer, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO cash SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Cash.findById = (customerId, result) => {
  sql.query(`SELECT * FROM invoice WHERE Invoice_ID = '${customerId}'`, (err, res) => {
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

Cash.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Cash.updateById = (id, customer, result) => {
  console.log(customer.acc_id)
  sql.query(
    "UPDATE cash SET acc_id = ?, name = ?, amount = ?, date = ? WHERE acc_id = ?",
    [customer.acc_id, customer.name, customer.amount, customer.date, id],
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



Cash.removeAll = result => {
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
Cash.remove = (id, result) => {
  sql.query("DELETE FROM invoice WHERE Invoice_ID = ?", id, (err, res) => {
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

    console.log("deleted invoice with Invoice_ID: ", id);
    result(null, res);
  });
};

module.exports = Cash;
