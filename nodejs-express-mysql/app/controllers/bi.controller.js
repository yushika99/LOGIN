const BI = require("../models/bi.model.js");
const BI_meet = require("../models/meeting.model.js");


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
  const bi = new BI({
    username: req.body.username,
    password: req.body.password
  });

  // Save Customer in the database
  BI.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Create and Save a new Customer
exports.create_meet = (req, res) => {
  console.log('request ' + req.body)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const meet = new BI_meet({
    title: req.body.title,
    description: req.body.description,
    Start_time: req.body.s_time,
    End_time: req.body.e_time,
    Attendees: req.body.att
  });

  // Save Customer in the database
  BI_meet.create(meet, (err, data) => {
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
  BI.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoices."
      });
    else res.send(data);
  });
};

// Retrieve all pp from the database.
exports.findAll_pp = (req, res) => {
  BI.getAll_pp((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoices."
      });
    else res.send(data);
  });
};

exports.findAll_emp = (req, res) => {
  BI.getempper((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoices."
      });
    else res.send(data);
  });
};

// Retrieve all meetings from the database.
exports.findAll_meet = (req, res) => {
  BI_meet.getAll_meet((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving meetings."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findrange = (req, res) => {
  BI.findByRange(req.params.Range, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found  with range ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving data with range " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  BI.findById(req.params.customerId, (err, data) => {
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

// Retrieve a single meeting with meetingid
exports.findOne_meet = (req, res) => {
  BI_meet.findById(req.params.Meet_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.Meet_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.Meet_id
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

  BI.updateById(
    req.params.customerId,
    new BI(req.body),
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

exports.update_meet = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  const meet = new BI_meet({
    title: req.body.title,
    description: req.body.description,
    Start_time: req.body.s_time,
    End_time: req.body.e_time,
    Attendees: req.body.att
  });

  BI_meet.updateById(
    req.params.Meet_id,
    meet,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found meeting with id ${req.params.Meet_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating meeting with id " + req.params.Meet_id
          });
        }
      } else res.send(data);
    }
  );


};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  BI.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete a Customer with the specified customerId in the request
exports.delete_meet = (req, res) => {
  BI_meet.remove(req.params.MeetID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting with id ${req.params.MeetID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete meeting with id " + req.params.MeetID
        });
      }
    } else res.send({ message: `meeting was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  BI.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
