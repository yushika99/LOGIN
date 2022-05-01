const sql = require("./db.js");

const Purchases = function(purchases) {
  this.Purchase_id = purchases.Purchase_id;
  this.Supplier_id = purchases.Supplier_id;
    this.Product_id = purchases.Product_id;
  this.Date = purchases.Date;
  this.quantity = purchases.quantity;
  this.P_price = purchases.P_price;
  this.S_price = purchases.S_price;
};


const Reque = function(reque) {
  this.id = reque.id;
  this.name = reque.name;
    this.type = reque.type;
  this.quantity = reque.quantity;

};





Purchases.getAll = result => {
  sql.query("SELECT * FROM requests WHERE type = 'MANU'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};





Purchases.getAll_inq7 = result => {
  sql.query("SELECT * FROM purchases WHERE purchases.Date > now() - INTERVAL 7 day", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};


Purchases.getAll_inq30 = result => {
  sql.query("SELECT * FROM purchases WHERE purchases.Date > now() - INTERVAL 30 day", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};


Purchases.getAll_inq365 = result => {
  sql.query("SELECT * FROM purchases WHERE purchases.Date > now() - INTERVAL 365 day", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};


Purchases.remove = (id, result) => {
  sql.query("DELETE FROM requests WHERE id = ?", id, (err, res) => {
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

    console.log("deleted request with id: ", id);
    result(null, res);
  });
};




module.exports = Purchases;
