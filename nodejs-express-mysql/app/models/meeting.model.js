const sql = require("./db.js");

// constructor

const Meet = function(meet) {
  this.title = meet.title;
  this.description = meet.description;
  this.Start_time = meet.Start_time;
  this.End_time = meet.End_time;
  this.Attendees = meet.Attendees;
};

Meet.create = (newMeet, result) => {
  //console.log(newCustomer)
  sql.query("INSERT INTO meetings SET ?", newMeet, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newMeet });
    result(null, { id: res.insertId, ...newMeet });
  });
};

Meet.findById = (meetid, result) => {
  sql.query(`SELECT * FROM meetings WHERE Meeting_ID = '${meetid}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Meet.getAll_meet = result => {
  sql.query("SELECT * FROM meetings WHERE Start_time >= CURDATE() ORDER BY Start_time DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("meetings: ", res);
    result(null, res);
  });
};

Meet.updateById = (id, meeting, result) => {

  console.log('model' + meeting.Start_time)
  sql.query(
    "UPDATE meetings SET title = ?, description = ?, Start_time = ?, End_time = ?, Attendees = ? WHERE Meeting_ID = ?",
    [meeting.title, meeting.description, meeting.Start_time, meeting.End_time, meeting.Attendees, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated meeting: ", { id: id, ...meeting });
      result(null, { id: id, ...meeting });
    }
  );
};

Meet.remove = (id, result) => {
  sql.query("DELETE FROM meetings WHERE Meeting_ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted meeting with id: ", id);
    result(null, res);
  });
};

Meet.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

//module.exports = User;
module.exports = Meet;
