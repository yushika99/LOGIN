const Emp_benefits = require("../models/emp_benefits.model.js");



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
  const emp = new Emp_benefits({
    Emp_id: req.body.Emp_id,
    basic_sal: req.body.basic_sal,
    month: req.body.month,
    allowance: req.body.allowance
  });

  // Save Customer in the database
  Emp_benefits.create(emp, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    else res.send(data);
  });
};






exports.findAll = (req, res) => {
  Emp_benefits.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};
