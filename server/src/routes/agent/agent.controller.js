const models = require("../../DB/models");

exports.findAllUSerDisposeRequest = (req, res) => {
  models.Requests.findAll({
    where: {
      MOD_USER_ID: req.user.User_id,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: "find error",
      });
    });
};
