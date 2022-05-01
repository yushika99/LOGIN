const sql = require("./db.js");

// constructor
const Managingdb = function(invoice) {
  this.Invoice_ID = invoice.Invoice_ID;
  this.Supplier_ID = invoice.Supplier_ID;
  this.Total = invoice.Total;
  this.Discount = invoice.Discount;
  this.date = invoice.date;
};

Managingdb.create = (newCustomer, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO invoice SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Managingdb.findById = (customerId, result) => {
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

Managingdb.getAll = result => {
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

Managingdb.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE invoice SET Supplier_ID = ?, Total = ?, Discount = ?, date = ? WHERE Invoice_ID = ?",
    [customer.Supplier_ID, customer.Total, customer.Discount, customer.date, id],
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



Managingdb.removeAll = result => {
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
Managingdb.remove = (id, result) => {
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

module.exports = Managingdb;
