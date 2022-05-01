const CRM = require("../models/crm.model.js");
const CRM_u = require("../models/crm.model.js");


// Create new customer inquiry
exports.create = (req, res) => {
  console.log('request ' + req.body)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  

  const crmI = new CRM({
    Sales_ID: req.body.Sales_ID,
    Customer_inquiry: req.body.Customer_inquiry,
    client_ID: req.body.client_ID,
    stat: req.body.stat,
  });

  
  CRM.create(crmI, (err, data) => {
    console.log('samle id' + req.body.Sales_ID)
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating this inquiry."
      });
    else res.send(data);
  });
};

// Retrieve all Customers inquiry from the database for update.
exports.findAll = (req, res) => {
  CRM.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers inquiry."
      });
    else res.send(data);
  });
};
// inquiry management table data
exports.findAll_g = (req, res) => {
  CRM.getAll_g((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers inquiry."
      });
    else res.send(data);
  });
};

// Retrieve all inquiries from the database for table in home.js
exports.findAll_inq = (req, res) => {
  CRM.getAll_inq((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers inquiry."
      });
    else res.send(data);
  });
};

// Retrieve all inquiries from the database for weekly report
exports.findAll_inq7 = (req, res) => {
  CRM.getAll_inq7((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers inquiry."
      });
    else res.send(data);
  });
};

// Retrieve all inquiries from the database.
exports.findAll_inq30 = (req, res) => {
  CRM.getAll_inq30((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers inquiry."
      });
    else res.send(data);
  });
};

// Retrieve all inquiries from the database.
exports.findAll_inq365 = (req, res) => {
  CRM.getAll_inq365((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers inquiry."
      });
    else res.send(data);
  });
};

// Retrieve all sales details from the database to inquiry form.
exports.findAll_inq_join = (req, res) => {
  CRM.getAll_inq_join(req.params.salesid, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Customer with id ${req.params.salesid}.`
         });
       } else {
         res.status(500).send({
           message: "Error retrieving Customer with id " + req.params.salesid
         });
       }
    } else res.send(data);
   });
};

// Find a single Customer with a customer nic
exports.findOne = (req, res) => {
  CRM.findById(req.params.inq_id, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Customer with id ${req.params.inq_id}.`
         });
       } else {
         res.status(500).send({
           message: "Error retrieving Customer with id " + req.params.inq_id
         });
       }
    } else res.send(data);
   });
 };

// Find a single Customer with a customerId
// exports.find_cat = (req, res) => {
//   CRM.findByCat(req.params.crm_cat, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Customer with id ${req.params.customerId}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Customer with id " + req.params.customerId
//         });
//       }
//     } else res.send(data);
//   });
// };


// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const crmI_u = new CRM_u({
    Customer_inquiry: req.body.Customer_inquiry,
    stat: req.body.stat,
  });


  CRM.updateById(
    req.params.Customer_NIC,
    new CRM_u(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.Customer_NIC}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.Customer_NIC
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Item with the specified Item_ID in the request
exports.delete = (req, res) => {
  CRM.remove(req.params.Customer_NIC, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Item with id ${req.params.Customer_NIC}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Item with id " + req.params.Customer_NIC
        });
      }
    } else res.send({ message: `Item was deleted successfully!` });
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
