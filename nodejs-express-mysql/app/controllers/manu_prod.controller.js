//const BI = require("../models/bi.model.js");
const manu_prod_m = require("../models/manu_prod.model.js");


// Create and Save a new Customer
exports.create = (req, res) => {
  console.log('request ' + req.body)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Production
  const manu_prod = new manu_prod_m({
    Product_ID:req.Product_ID,
    name: req.body.name,
    Details: req.body.Details,
    Production_stat: req.body.Production_stat,
    Machine_no: req.body.Machine_no,
  });

  // Save Customer in the database
  manu_prod_m.create(manu_prod, (err, data) => {
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
  manu_prod_m.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving manufacturing Products."
      });
    else res.send(data);
  });
};


// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  manu_prod_m.findById(req.params.Product_ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.Product_ID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.Product_ID
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

  const manu_prod = new manu_prod_m({
    name: req.body.name,
    Details: req.body.Details,
    Production_stat: req.body.Production_stat,
    Machine_no: req.body.Machine_no,
  });

  manu_prod_m.updateById(
    req.params.Product_ID,
    new manu_prod_m(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.Product_ID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.Product_ID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Product with the specified ProductId in the request
exports.delete = (req, res) => {
  manu_prod_m.remove(req.params.Product_ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.Product_ID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.Product_ID
        });
      }
    } else res.send({ message: `Manufatuting Product was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  manu_prod_m.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
