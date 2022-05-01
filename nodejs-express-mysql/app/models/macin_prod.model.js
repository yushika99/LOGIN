const sql = require("./db.js");

// constructor
const Machine = function(manf) {
  this.Machine_no=manf.Machine_no;
  this.name = manf.name;
  this.Machine_stat = manf.Machine_stat;
 // this.Production_stat = prod.Production_stat;
  //this.Machine_no = prod.Machine_no;
};


Machine.create = (newMnfProduct, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO machines SET ?", newMnfProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Machine: ", { id: res.insertId, ...newMnfProduct });
    result(null, { id: res.insertId, ...newMnfProduct });
  });
};

Machine.findById = (customerId, result) => {
  sql.query(`SELECT * FROM machines WHERE Machine_no = '${customerId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Machine: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Machine.getAll = result => {
  sql.query("SELECT * FROM machines", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Machine.getAll_cat = result => {
  sql.query("SELECT COUNT(product.Product_ID) AS cnt FROM product GROUP BY product.Production_stat", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Machine.findprodall = result => {
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

Machine.findprod7 = result => {
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

Machine.getMachine = result => {
  sql.query("SELECT * FROM machines", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Machine.find_prodcount = result => {
  sql.query("SELECT COUNT(machines.Machine_no) AS count FROM machines GROUP BY machines.Machine_stat", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Machine.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE machines SET name = ?, Machine_stat = ? WHERE Machine_no = ?",
    [customer.name, customer.Machine_stat, customer.Machine_no, id],
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

Machine.remove = (id, result) => {
  sql.query("DELETE FROM machines WHERE Machine_no = ?", id, (err, res) => {
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

Machine.removeAll = result => {
  sql.query("DELETE FROM machines", (err, res) => {
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

module.exports = Machine;
//module.exports = Meet;
