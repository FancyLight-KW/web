const bcrypt = require("bcrypt");
const saltRounds = 10;

bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
    // Store hash in your password DB.
  });
});
