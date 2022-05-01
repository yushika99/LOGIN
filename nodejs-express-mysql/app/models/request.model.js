const sql = require("./db.js");

// constructor
const Rrequest = function(rrequest) {
  this.name = rrequest.name;
  this.type = rrequest.type;
  this.quantity = rrequest.quantity;
};

Rrequest.create = (newRequest, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO requests SET ?", newRequest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Item: ", { id: res.insertId, ...newRequest });
    result(null, { id: res.insertId, ...newRequest });
  });
};
module.exports = Rrequest;
