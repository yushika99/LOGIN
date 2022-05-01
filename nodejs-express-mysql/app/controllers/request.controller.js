const Rrequest = require("../models/request.model.js");


// Create and Save a new Item
exports.createreq = (req, res) => {
    console.log('request ' + req.body)
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    //Create a new Item
    const rrequest = new Rrequest({
      name: req.body.name,
      type: req.body.type,
      quantity: req.body.quantity,
    });

    // Save Item in the database
    Rrequest.create(rrequest, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating this Item."
        });
      else res.send(data);
    });
  };
