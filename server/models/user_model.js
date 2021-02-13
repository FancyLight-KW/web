const sql = require("./db.js");
const tbl_name = "User_Table";

const User = function (user) {
  //this.User_Index = user.User_Index;
  this.User_ID = user.User_ID;
  this.User_Password = user.User_Password;
  this.User_Name = user.User_Name;
  this.User_Birth = user.User_Birth;
  this.User_Phone = user.User_Phone;
};

User.create = (new_user, result) => {
  sql.query(`INSERT INTO ${tbl_name} SET ?`, new_user, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...new_user });
    result(null, { id: res.insertId, ...new_user });
  });
};

User.findById = (user_index, result) => {
  sql.query(
    `SELECT * FROM ${tbl_name} WHERE User_Index = ${user_index}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found User with the id
      result({ kind: "not_found" }, null);
    }
  );
};

User.getAll = (result) => {
  sql.query(`SELECT * FROM ${tbl_name}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

//   User.updateById = (id, customer, result) => {
//     sql.query(
//       "UPDATE User_Table SET params = ? WHERE id = ?",
//       [],
//       (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }

//         if (res.affectedRows == 0) {
//           // not found User with the id
//           result({ kind: "not_found" }, null);
//           return;
//         }

//         console.log("updated customer: ", { id: id, ...customer });
//         result(null, { id: id, ...customer });
//       }
//     );
//   };

User.remove = (id, result) => {
  sql.query(`DELETE FROM ${tbl_name} WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${tbl_name} with id: `, id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  sql.query(`DELETE FROM ${tbl_name}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
