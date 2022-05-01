const sql = require("./db.js");

// constructor
const Sales = function(sales) {
  this.Client_ID = sales.Client_ID;
  this.Product_ID = sales.Product_ID;
  this.quantity= sales.quantity;
};

Sales.create = (newSales, result) => {
  //console.log(newSales)
  sql.query("INSERT INTO sales SET ?", newSales, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created sales: ", { id: res.insertId, ...newSales });
    result(null, { id: res.insertId, ...newSales});
  });
};

Sales.findById = (customerId, result) => {
  sql.query(`SELECT * FROM client WHERE Client_ID = '${customerId}'`, (err, res) => {
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

    // not found Sales with the id
    result({ kind: "not_found" }, null);
  });
};

Sales.getAll = result => {
  sql.query("SELECT * FROM client", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Sales.getAll_inq7 = result => {
  sql.query("SELECT * FROM sales WHERE sales.Date > now() - INTERVAL 7 day", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Sales.getAll_inq30 = result => {
  sql.query("SELECT * FROM sales WHERE sales.Date > now() - INTERVAL 30 day", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Sales.getAll_inq365 = result => {
  sql.query("SELECT * FROM sales WHERE sales.Date > now() - INTERVAL 365 day", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Sales.getAll_g1 = result => {
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

Sales.getAll_g2 = result => {
  sql.query("SELECT SUM(sales.quantity) AS qua FROM sales WHERE Date >= DATE_ADD(CURDATE(), INTERVAL - 30 DAY)", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Sales.getAll_g3 = result => {
  sql.query("SELECT inventory.Product_name, SUM(sales.quantity) AS qua FROM sales INNER JOIN inventory ON inventory.Product_ID = sales.Product_ID WHERE sales.Date >= DATE_ADD(CURDATE(), INTERVAL - 30 DAY) GROUP BY inventory.Product_name ORDER BY SUM(sales.quantity) DESC LIMIT 5", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Sales.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE users SET name = ?, contact = ? WHERE id = ?",
    [customer.name, customer.contact, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Sales with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Sales.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Sales with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Sales.removeAll = result => {
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

module.exports = Sales;
