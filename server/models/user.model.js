const sql = require("./db.js");
const tbl_name = "User_ID_PWD";

const User = function (user) {
  this.User_ID = user.User_ID;
  this.User_PWD = user.User_PWD;
  this.User_Name = user.User_Name;
};

User.create = (new_user, result) => {
  console.log("< POST > create new user");
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

User.findById = (user_ID, result) => {
  sql.query(
    `SELECT * FROM ${tbl_name} WHERE User_ID = ?`,
    user_ID,
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

User.updateById = (id, user, result) => {
  sql.query(
    `UPDATE ${tbl_name} SET User_ID = ?, User_PWD = ?, User_Name = ? WHERE idx = ?`,
    [user.User_ID, user.User_PWD, user.User_Name, id],
    (err, res) => {
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
      console.log("updated User: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query(`DELETE FROM ${tbl_name} WHERE User_ID=?`, id, (err, res) => {
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

    console.log(`deleted ${tbl_name} with ID: `, id);
    result(null, res);
  });
};

module.exports = User;
