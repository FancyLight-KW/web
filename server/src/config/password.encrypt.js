const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = process.env.SALT;

exports.encrypt = (password) => {
  return bcrypt.hashSync(password, 10);
};

//비밀번호 확인
exports.isPasswordSame = (password, encodedPassword) => {
  return bcrypt.compareSync(password, encodedPassword);
};
