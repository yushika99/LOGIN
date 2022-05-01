const sql = require("./db.js");

// constructor
const Customers = function(crm) {

  this.Sales_ID = crm.Sales_ID;
  this.Customer_inquiry = crm.Customer_inquiry;
  this.client_ID = crm.client_ID;
  this.stat = crm.stat;
};


Customers.create = (newCRM, result) => {
  sql.query("INSERT INTO inquiries SET ?", newCRM, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created inquiry: ", { id: res.insertId, ...newCRM });
    result(null, { id: res.insertId, ...newCRM });
  });
};

Customers.findById = (customerId, result) => {
  sql.query(`SELECT inquiries.InquireID, inquiries.stat, inquiries.Sales_ID, inquiries.Customer_inquiry, inquiries.inquiry_date, sales.Product_ID, sales.quantity, sales.Date AS purc_date, client.name, client.contact FROM inquiries INNER JOIN sales ON inquiries.Sales_ID = sales.Sales_ID INNER JOIN client ON inquiries.client_ID = client.Client_ID WHERE inquiries.InquireID = '${customerId}'`, (err, res) => {
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

// Customers.findByCat = (category, result) => {
//   sql.query(`SELECT * FROM customers WHERE Product_type = '${category}'`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found customer: ", res);
//       result(null, res);
//       return;
//     }

//     // not found Customer with the id
//     result({ kind: "not_found" }, null);
//   });
// };

Customers.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

// inquiry management table data query
Customers.getAll_g = result => {
  sql.query("SELECT inquiries.stat, COUNT(inquiries.Sales_ID) AS count FROM inquiries GROUP BY inquiries.stat", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customers.getAll_inq = result => {
  sql.query("SELECT inquiries.InquireID, inquiries.Sales_ID, inquiries.Customer_inquiry, inquiries.inquiry_date, inquiries.stat, sales.Product_ID, sales.quantity, sales.Date AS purc_date, client.name, client.contact FROM inquiries INNER JOIN sales ON inquiries.Sales_ID = sales.Sales_ID INNER JOIN client ON inquiries.client_ID = client.Client_ID", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customers.getAll_inq7 = result => {
  sql.query("SELECT inquiries.InquireID, inquiries.Sales_ID, inquiries.Customer_inquiry, inquiries.inquiry_date, inquiries.stat, sales.Product_ID, sales.quantity, sales.Date AS purc_date, client.name, client.contact FROM inquiries INNER JOIN sales ON inquiries.Sales_ID = sales.Sales_ID INNER JOIN client ON inquiries.client_ID = client.Client_ID WHERE inquiries.inquiry_date > now() - INTERVAL 7 day", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customers.getAll_inq30 = result => {
  sql.query("SELECT inquiries.InquireID, inquiries.Sales_ID, inquiries.Customer_inquiry, inquiries.inquiry_date, inquiries.stat, sales.Product_ID, sales.quantity, sales.Date AS purc_date, client.name, client.contact FROM inquiries INNER JOIN sales ON inquiries.Sales_ID = sales.Sales_ID INNER JOIN client ON inquiries.client_ID = client.Client_ID WHERE inquiries.inquiry_date > now() - INTERVAL 30 day", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customers.getAll_inq365 = result => {
  sql.query("SELECT inquiries.InquireID, inquiries.Sales_ID, inquiries.Customer_inquiry, inquiries.inquiry_date, inquiries.stat, sales.Product_ID, sales.quantity, sales.Date AS purc_date, client.name, client.contact FROM inquiries INNER JOIN sales ON inquiries.Sales_ID = sales.Sales_ID INNER JOIN client ON inquiries.client_ID = client.Client_ID WHERE inquiries.inquiry_date > now() - INTERVAL 365 day", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
//to get client and sales details to add inquiry form
Customers.getAll_inq_join = (salesid, result) => {
  sql.query(`SELECT sales.Sales_ID, client.Client_ID, client.name, client.contact, sales.Product_ID FROM sales INNER JOIN client ON sales.Client_ID = client.Client_ID WHERE sales.Sales_ID = '${salesid}'`, (err, res) => {
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

Customers.updateById = (id, customer, result) => {
  console.log('model' + customer.stat)
  sql.query(
    "UPDATE inquiries SET Customer_inquiry = ?, stat = ? WHERE InquireID = ?",
    [customer.Customer_inquiry, customer.stat, id],
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
//delete inquiry query
Customers.remove = (id, result) => {
  sql.query("DELETE FROM inquiries WHERE InquireID = ?", id, (err, res) => {
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

    console.log("deleted Item with id: ", id);
    result(null, res);
  });
};

Customers.removeAll = result => {
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

module.exports = Customers;
