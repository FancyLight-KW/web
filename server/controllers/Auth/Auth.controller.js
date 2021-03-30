const jwt = require("jsonwebtoken");
const models = require("../../models");
const encrypt = require("../../config/password.encrypt");
const moment = require("../../config/moment.config");

exports.login = (req, res) => {
  models.Users.findOne({
    where: {
      User_id: req.body.User_id,
    },
  })
    .then((result) => {
      if (
        encrypt.isPasswordSame(req.body.User_password, result.User_password)
      ) {
        // Check password
        const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
        models.Users.update(
          {
            User_lastlogin: nowDate,
          },
          {
            where: {
              User_id: result.User_id,
            },
          }
        );
        const token = jwt.sign(
          {
            User_id: result.User_id,
            User_name: result.User_name,
            User_lastlogin: nowDate,
            User_position: result.User_position,
          },
          process.env.SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.send({
          token: token,
          resultCode: 0,
        });
      } else {
        console.log("Login: Invalid password");
        res.send({
          message: "Invalid user",
          resultCode: 1,
        });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
