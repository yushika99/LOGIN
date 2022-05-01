const Hr_attendance = require("../models/hr_leave.model.js");



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
  const emp_leave = new Hr_attendance({
    Emp_id: req.body.Emp_id,
    type: req.body.type,
    month: req.body.month,
    
  });

  // Save Customer in the database
  Hr_attendance.create(emp_leave, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    else res.send(data);
  });
};






exports.findAll = (req, res) => {
    Hr_attendance.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};
