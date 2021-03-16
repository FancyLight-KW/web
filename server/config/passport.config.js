//const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require("../models");
const encrypt = require("./password.encrypt");

const passportConfig = (passport) => {
  console.log("passport init")
  
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    console.log("serializeUser" + JSON.stringify(user));
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    console.log("deserializeUser:"+ JSON.stringify(user));
    done(null, user);
  });

  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'User_id',
    passwordField: 'User_password',
    session: true, // 세션에 저장 여부
    passReqToCallback : true
  }, (req, username, password, done) => {
    models.Users.findOne({
      where: {
        User_id: username
      }
    }).then((result) => {
      if(!result){
        console.log("no user");
        return done(null, false, {message: "no user"});
      }
      if(encrypt.isPasswordSame(password, result.User_password)){
        console.log("yes! pwd");
        console.log(result)
        return done(null, result);
      }
      else{
        console.log("incorrect pwd");
        return done(null, false, { message: "password error", resultCode: 1})
      }
    }).catch((err) => {
      return done(err, false, { message: "Error", resultCode: 2})
    })
  }));
}
module.exports = passportConfig;