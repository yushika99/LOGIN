const sql = require("./db.js");

// constructor
const Product = function(prod) {
  this.Product_ID=prod.Product_ID;
  this.name = prod.name;
  this.Details = prod.Details;
  this.Production_stat = prod.Production_stat;
  this.Machine_no = prod.Machine_no;
};






Product.create = (newMProduct, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO product SET ?", newMProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newMProduct });
    result(null, { id: res.insertId, ...newMProduct });
  });
};

Product.findById = (customerId, result) => {
  sql.query(`SELECT * FROM product WHERE Product_ID = '${customerId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};


Product.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE product SET name = ?, Details = ?, Production_stat = ?,Machine_no =?  WHERE Product_ID = ?",
    [customer.name, customer.Details, customer.Production_stat,customer.Machine_no, id],
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

      console.log("updated product: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Product.remove = (id, result) => {
  sql.query(`DELETE FROM product WHERE Product_ID = '${id}'`, (err, res) => {
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

Product.removeAll = result => {
  sql.query("DELETE FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

//add by mee

module.exports = Product;
//module.exports = Meet;
