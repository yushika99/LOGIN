const Managingdb = require("../models/managingdb.model.js");


// Create and Save a new Customer
exports.create = (req, res) => {
  console.log('request ' + req.body)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const invoice = new Managingdb({
    Invoice_ID: req.body.Invoice_ID,
    Supplier_ID: req.body.Supplier_ID,
    Total: req.body.Total,
    Discount: req.body.Discount,
    date: req.body.date
  });

  // Save Customer in the database
  Managingdb.create(invoice, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Managingdb.findById(req.params.Invoice_ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Managingdb.updateById(
    req.params.Invoice_ID,
    new Managingdb(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.Invoice_ID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.Invoice_ID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete_invoice = (req, res) => {
  Managingdb.remove(req.params.Invoice_ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Invoice with id ${req.params.Invoice_ID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Invoice with id " + req.params.Invoice_ID
        });
      }
    } else res.send({ message: `Invoice was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
