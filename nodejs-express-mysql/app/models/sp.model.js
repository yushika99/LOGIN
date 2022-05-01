const sql = require("./db.js");

const Supplier = function(supplier) {
  this.supplier_id = supplier.supplier_id;
  this.name = supplier.name;
  this.contact = supplier.contact;
this.address = supplier.address;
this.nic = supplier.nic;
this.br = supplier.br;
};


Supplier.getAll = result => {
  sql.query("SELECT * FROM supplier", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Suppliers: ", res);
    result(null, res);
  });
};


Supplier.create = (newSupplier, result) => {
  //console.log(newSupplier)
  sql.query("INSERT INTO supplier SET ?", newSupplier, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Item: ", { id: res.insertId, ...newSupplier });
    result(null, { id: res.insertId, ...newSupplier });
  });
};


Supplier.updateById = (id, supplier, result) => {
  sql.query(
    "UPDATE supplier SET name = ?, contact = ? WHERE Supplier_ID = ?",
    [supplier.name, supplier.contact, id],
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

      console.log("updated supplier: ", { supplierId: id, ...Supplier });
      result(null, { supplierId: id, ...Supplier });
    }
  );
};




Supplier.remove = (id, result) => {
  sql.query("DELETE FROM supplier WHERE Supplier_ID = ?", id, (err, res) => {
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

    console.log("deleted Supplier with id: ", id);
    result(null, res);
  });
};










module.exports = Supplier;
