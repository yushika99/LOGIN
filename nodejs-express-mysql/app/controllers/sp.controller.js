const SP = require("../models/sp.model.js");


exports.findAll = (req, res) => {
  SP.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};



exports.create = (req, res) => {
  console.log('request ' + req.body)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a new Item
  const sp = new SP({
    name: req.body.name,
    contact: req.body.contact,
  address: req.body.address,
  nic: req.body.nic,
  br: req.body.br,

  });

  // Save Item in the database
  SP.create(sp, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating this Item."
      });
    else res.send(data);
  });
};


// update specific supplier by supplierId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  SP.updateById(
    req.params.supplierId,
    new SP(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found supplier with id ${req.params.supplierId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating supplier with id " + req.params.supplierId
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a supplier with the specified supplierId in the request
exports.delete = (req, res) => {
  SP.remove(req.params.supplierId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found supplier with id ${req.params.supplierId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete supplier with id " + req.params.supplierId
        });
      }
    } else res.send({ message: `supplier was deleted successfully!` });
  });
};
