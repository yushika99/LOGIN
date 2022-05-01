const Inventory = require("../models/inventory.model.js");
const Product = require("../models/manu_prod.model.js");


// Create and Save a new Item
exports.create = (req, res) => {
  console.log('request ' + req.body)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a new Item
  const inventory = new Inventory({
    Product_ID:req.Product_ID,
    Product_name: req.body.name,
    Product_type: req.body.type,
    quantity: req.body.quantity,
  });

  // Save Item in the database
  Inventory.create(inventory, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating this Item."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Inventory.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findforgraph = (req, res) => {
  Inventory.getAllgraph((err, data) => {
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
  Inventory.findById(req.params.customerId, (err, data) => {
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

// Find a single Customer with a customerId
exports.find_cat = (req, res) => {
  Inventory.findByCat(req.params.itm_cat, (err, data) => {
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

  Inventory.updateById(
    req.params.customerId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Item with the specified Item_ID in the request
exports.delete_product = (req, res) => {
  Inventory.remove(req.params.Product_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.Product_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.Product_id
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Inventory.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};

//Update Product ID
exports.updateid = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  const inventory = new Inventory({
    Product_ID: req.body.pid,
    Product_ID: req.body.nvalue
  });

  Inventory.updateidById(
    req.params.Product_id,
    inventory,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.Product_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating product with id " + req.params.Product_id
          });
        }
      } else res.send(data);
    }
  );


};

//Update Product Name
exports.updatename = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  const inventory = new Inventory({
    Product_ID: req.body.pid,
    Product_name: req.body.nvalue
  });

  Inventory.updatenameById(
    req.params.Product_id,
    inventory,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.Product_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating product with id " + req.params.Product_id
          });
        }
      } else res.send(data);
    }
  );


};

//Update Product Type
exports.updatetype = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  const meet = new Inventory({
    Product_ID: req.body.pid,
    Product_type: req.body.nvalue
  });

  Inventory.updatetypeById(
    req.params.Product_id,
    meet,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.Product_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating product with id " + req.params.Product_id
          });
        }
      } else res.send(data);
    }
  );


};

//Update Product Quantity
exports.updatequantity = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  const inventory = new Inventory({
    Product_ID: req.body.pid,
    quantity: req.body.nvalue
  });

  Inventory.updatequantityById(
    req.params.Product_id,
    inventory,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.Product_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating product with id " + req.params.Product_id
          });
        }
      } else res.send(data);
    }
  );


};
