const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.encrypt = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

exports.isPasswordSame = (password, encodedPassword) => {
  return bcrypt.compareSync(password, encodedPassword);
};
