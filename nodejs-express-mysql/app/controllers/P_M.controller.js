const P_M = require("../models/P_M.model.js");


exports.findAll = (req, res) => {
  P_M.getAll((err, data) => {
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
  const p_m = new P_M({
    Supplier_id: req.body.Supplier_id,
    Product_id: req.body.Product_id,
    Date: req.body.Date,
    quantity: req.body.quantity,
    P_price: req.body.P_price,
    S_price: req.body.S_price,


  });

  // Save Item in the database
  P_M.create(p_m, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating this Item."
      });
    else res.send(data);
  });
};
