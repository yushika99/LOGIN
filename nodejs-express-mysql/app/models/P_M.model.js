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


Purchases.getAll = result => {
  sql.query("SELECT * FROM purchases", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("purchase: ", res);
    result(null, res);
  });
};


Purchases.create = (purchase_data, result) => {
  //console.log(Purchases)
  sql.query("INSERT INTO purchases SET ?", purchase_data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }


    result(null, { id: res.insertId, ...purchase_data });
  });
};





module.exports = Purchases;
