module.exports = app => {
  const customers = require("../controllers/users.controller.js");
  const inv = require("../controllers/inventory.controller.js");
  const bi = require("../controllers/bi.controller.js");
  const manu_prod = require("../controllers/manu_prod.controller.js");
  const macnin_prod = require("../controllers/macin_prod.controller");
  const pm = require("../controllers/P_M.controller.js");
  const sp = require("../controllers/sp.controller.js");
  const crmI = require("../controllers/crm.controller.js");
  const managingdb = require("../controllers/managingdb.controller.js");
  const hr = require("../controllers/Hr.controller.js");
  const sales =  require("../controllers/sales.controller.js");
  const emp_benefits =  require("../controllers/emp_benefits.controller.js");
  const hr_attendance =  require("../controllers/hr_attendance.controller.js");
  const rr =  require("../controllers/request.controller.js");
 const pm2 = require("../controllers/P_M_reports.controller.js");
 const cash = require("../controllers/cash.controller.js");



  // Retrieve all hr_attendance
  app.get("/hr_attendance", hr_attendance.findAll);

  // Create  hr_attendance
  app.post("/hr_attendance", hr_attendance.create);


  // Retrieve all emp_benefits
  app.get("/emp_benefits", emp_benefits.findAll);

  // Create  emp_benefits
  app.post("/emp_benefits", emp_benefits.create);


  // Create a new Customer
  app.post("/users", customers.create);

  // Retrieve all Customers
  app.get("/users", customers.findAll);

  // Retrieve all Customers
  app.post("/inv/request", rr.createreq);

  // Retrieve a single Customer with customerId
  app.get("/users/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/users/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/users/:customerId", customers.delete);

  // Delete a new Customer
  app.delete("/users", customers.deleteAll);

  // Create a new Item
  app.post("/inventory", inv.create);

  // Retrieve all Customers
  app.get("/inventory", inv.findAll);


  // Retrieve all Customers
  app.get("/inventory_graph", inv.findforgraph);

  // Retrieve a Items for category
  app.get("/inventory/:itm_cat", inv.find_cat);

  // Delete a product with id
  app.delete("/inventory/:Product_id", inv.delete_product);

  // Update a product id with productid
  app.put("/inventory/id/:Product_id", inv.updateid);

  // Update a product name with productid
  app.put("/inventory/name/:Product_id", inv.updatename);

  // Update a product id with productid
  app.put("/inventory/type/:Product_id", inv.updatetype);

  // Update a product id with productid
  app.put("/inventory/quantity/:Product_id", inv.updatequantity);



//  http://localhost:3220/request

  // Retrieve BI for first graph
  app.get("/BI/rev", bi.findAll);

  // Retrieve BI for first graph
  app.get("/BI/rev/:Range", bi.findrange);

  // Retrieve purchased and production for first 3rd
  app.get("/BI/pp", bi.findAll_pp);

  // Retrieve meetings for popup
  app.get("/BI/meetings", bi.findAll_meet);

  // Retrieve meetings for popup
  app.post("/BI/meetings", bi.create_meet);

  // Retrieve meetings for popup
  app.get("/BI/emp_per", bi.findAll_emp);

  // Retrieve a single meeting with meetingid
  app.get("/BI/meetings/:Meet_id", bi.findOne_meet);

  // Update a meetings with meetingid
  app.put("/BI/meetings/:Meet_id", bi.update_meet);

  // Delete a meeting with meetingid
  app.delete("/BI/meetings/:MeetID", bi.delete_meet);

  // Retrieve Manu for sample
  app.get("/manu/prod", manu_prod.findAll);

  // Retrieve all Customers
  app.get("/manu/manf", macnin_prod.findAll);

  // Retrieve Manu for sample
  app.post("/manu/prod", manu_prod.create);

    // Retrieve Manu for sample
  app.post("/manu/manf", macnin_prod.create);



  // Retrieve a single Product with ProductId
  app.get("/manu/:Product_ID", manu_prod.findOne);

  // Retrieve data for manufacturing home graph
  app.get("/manu_prod_g/graph", macnin_prod.findcat);

  // Retrieve data for manufacturing product table
  app.get("/manu_prod_g/prod", macnin_prod.findprodall);

  // Retrieve data for doughnut chart
  app.get("/manu_prod_g/dough", macnin_prod.findcount);


  // Retrieve data for goughnut chart
  app.get("/manu_prod_g/c_machine", macnin_prod.find_machine);

  // Retrieve a single Machine with MachineId
  // Retrieve a single Customer with customerId

  app.get("/manu_prod_g/rep7", macnin_prod.findprod7); //repaste

  app.get("/manu_prod_g/rep30", macnin_prod.findprod30); //repaste

  app.get("/manu_prod_g/rep365", macnin_prod.findprod365); //repaste

  // Retrieve a single Customer with customerId

  app.get("/manf/:Machine_no", macnin_prod.findOne);

  // Update a Product with ProductId
  app.put("/manu_prod/:Product_ID", manu_prod.update);

  // Update a Machine with MachineId
  app.put("/macnin_prod/:Machine_no", macnin_prod.update);

  // Delete a Product with ProductId
  app.delete("/manu_prod/:Product_ID", manu_prod.delete);

   // Delete a Machine with MachineId
  app.delete("/macnin_prod/:Machine_no", macnin_prod.delete);

  // Delete all product
  app.delete("/manu_prod", manu_prod.deleteAll);



  // Retrieve all purchases
 app.get("/purchases", pm.findAll);

 // make a new purchase
 app.post("/purchases", pm.create);




    app.get("/purchases/requests", pm2.findAll);

     app.delete("/purchases/requests/:id", pm2.delete);


 // Retrieve all inqusiries for last week
    app.get("/purchases/inq7", pm2.findAll_inq7);

    app.get("/purchases/inq30", pm2.findAll_inq30);

    app.get("/purchases/inq365", pm2.findAll_inq365);

 // Retrieve all suppliers
 app.get("/suppliers", sp.findAll);

 // Create a new supplier
 app.post("/suppliers", sp.create);

 // delete specific supplier
 app.delete("/suppliers/:supplierId", sp.delete);

 // update supplier details by id
 app.put("/suppliers/:supplierId", sp.update);


     // Create a new Invoice
     app.post("/account/invoice", managingdb.create);


   // Create a new inquiry
   app.post("/crm/crm", crmI.create);

   // Retrieve all Customers inquiry for update
   app.get("/crm/crm", crmI.findAll);

   // inquiry management table data
   app.get("/crm/dough", crmI.findAll_g);

   // Retrieve all inquiries for table in home.js
   app.get("/crm/inq", crmI.findAll_inq);

   app.get("/crm/inq7", crmI.findAll_inq7);

   // Retrieve all inquiries for last week
   app.get("/crm/inq30", crmI.findAll_inq30);

   // Retrieve all inquiries for last week
   app.get("/crm/inq365", crmI.findAll_inq365);


   // Retrieve all inquiries for last week
   app.get("/sales/inq7", sales.findAll_inq7);

   // Retrieve all inquiries for last week
   app.get("/sales/inq30", sales.findAll_inq30);

   // Retrieve all inquiries for last week
   app.get("/sales/inq365", sales.findAll_inq365);


   // Retrieve all inquiries

   // Retrieve all sales details to add inquiry table
   app.get("/crm/inq_join/:salesid", crmI.findAll_inq_join);

   // Retrieve a single Customer with customerId
   app.get("/crm/crm/:inq_id", crmI.findOne);

   // Update a Customer with customerId
   app.put("/crm/crm/:Customer_NIC", crmI.update);

   // Delete a Customer with customerId
   app.delete("/crmI/:Customer_NIC", crmI.delete);

   // Delete a new Customer inquiry
   app.delete("/crm", crmI.deleteAll);




   // Create a new invoice
   app.post("/acc/managingdb", managingdb.create);

   app.post("/acc/cash", cash.create);

   app.put("/acc/cash/:Invoice_ID", cash.update);


   // Create a new invoice
   app.put("/acc/managingdb/:Invoice_ID", managingdb.update);

   // Create a new invoice
   app.get("/acc/managingdb/:Invoice_ID", managingdb.findOne);

   // Delete a Invoice
   app.delete("/acc/managingdb/:Invoice_ID", managingdb.delete_invoice);


   // Retrieve all Hr emplyees
   app.get("/hr/emp", hr.findAll);

   // Retrieve all Hr emplyees
   app.get("/hr/sal", hr.getAll_sal);

      // Retrieve all Hr emplyees
   app.get("/hr/attl", hr.find_att);

   // Retrieve one Hr emplyees
   app.get("/hr/emp/:Emp_ID", hr.findOne);

   // Retrieve all Hr emplyees
   app.post("/hr/emp", hr.create);

   // Update a employee with empid
   app.put("/hr/emp/:Emp_ID", hr.update);

    // Create a new Sale
  app.post("/sales", sales.create);

  // Retrieve all Hr emplyees
  app.get("/sales/cli", sales.findAll_cli);

  // Retrieve all Hr emplyees
  app.get("/sales/g1", sales.findAllg1);


    // Retrieve all Hr emplyees
  app.get("/sales/g2", sales.findAllg2);

    // Retrieve all Hr emplyees
  app.get("/sales/g3", sales.findAllg3);

  // Retrieve a single client with customerId
  app.get("/sales/cli/:Client_ID", sales.findOne_cli);

  // Update a client with client id
  app.put("/sales/cli/:Client_ID", sales.update_cli);

};
