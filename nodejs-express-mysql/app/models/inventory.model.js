const sql = require("./db.js");

// constructor
const Inventory = function(inventory) {
  this.Product_ID = inventory.Product_ID;
  this.Product_name = inventory.Product_name;
  this.Product_type = inventory.Product_type;
  this.quantity = inventory.quantity;
};

Inventory.create = (newInventory, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO inventory SET ?", newInventory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Item: ", { id: res.insertId, ...newInventory });
    result(null, { id: res.insertId, ...newInventory });
  });
};

Inventory.findById = (customerId, result) => {
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

Inventory.findByCat = (category, result) => {
  sql.query(`SELECT * FROM inventory WHERE Product_type = '${category}'`, (err, res) => {
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

Inventory.getAll = result => {
  sql.query("SELECT * FROM inventory", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Inventory.getAllgraph = result => {
  sql.query("SELECT inventory.Product_name, inventory.quantity AS qua FROM inventory INNER JOIN sales ON sales.Product_ID = inventory.Product_ID GROUP BY sales.Product_ID LIMIT 5", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

//Update Product ID
Inventory.updateidById = (pid, field, result) => {
  sql.query(
    "UPDATE inventory SET Product_ID = ? WHERE Product_ID = ?",
    [field.Product_ID, pid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: pid, ...field });
      result(null, { id: pid, ...field });
    }
  );
};

//Update Product Name
Inventory.updatenameById = (pid, field, result) => {
  sql.query(
    "UPDATE inventory SET Product_name = ? WHERE Product_ID = ?",
    [field.Product_name, pid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: pid, ...field });
      result(null, { id: pid, ...field });
    }
  );
};






//Update Product Type
Inventory.updatetypeById = (pid, inventory, result) => {
  sql.query(
    "UPDATE inventory SET Product_type = ? WHERE Product_ID = ?",
    [inventory.Product_type, pid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: pid, ...inventory });
      result(null, { id: pid, ...inventory });
    }
  );
};





//Update Product Quantity
Inventory.updatequantityById = (pid, inventory, result) => {
  sql.query(
    "UPDATE inventory SET quantity = ? WHERE Product_ID = ?",
    [inventory.quantity, pid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: pid, ...inventory });
      result(null, { id: pid, ...inventory });
    }
  );
};






Inventory.remove = (code, result) => {
  sql.query("DELETE FROM inventory WHERE Product_ID = ?", code, (err, res) => {
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

    console.log("deleted product with id: ", code);
    result(null, res);
  });
};

Inventory.removeAll = result => {
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

module.exports = Inventory;
