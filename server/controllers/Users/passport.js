//const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require("../../models");
const encrypt = require("./encrypt");

const passportConfig = (passport) => {
  console.log("passport init")
  
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    console.log(user);
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    console.log("deserializeUser:", user);
    done(null, user);
  });

  // passport.use(new LocalStrategy({ // local 전략을 세움
  //   usernameField: 'id',
  //   passwordField: 'pwd',
  //   session: true, // 세션에 저장 여부
  //   passReqToCallback: true,  //req 사용여부
  // }, (req, username, password, done) => {
  //   console.log(`username ${username}, password ${password}`)
  //   models.Users.findOne({
  //     where: {
  //       User_id: username,
  //     },
  //   })
  //     .then((result) => {
  //       if (
  //         encrypt.isPasswordSame(password, result.User_password)
  //       ) { //패스워드 일치
  //         if(req.session.key){
  //           console.log('session valid (' + req.session.key + ')');
  //           //res.send('session is destroyed');
  //           return done(err, false)
  //         } else{
  //           req.session.key = req.body.User_id;
  //           console.log('session save success (' + req.session.key + ')');
  //           //res.send('session save success');
  //           return done(null, user)
  //         }
  //         // Check password
  //         // res.send({
  //         //   User_id: result.User_id,
  //         //   User_name: result.User_name,
  //         //   //User_lastlogin:
  //         //   User_position: result.User_position,
  //         //   resultCode: 0,
  //         // });
  //         return done(null, result); 
  //       } else {
  //         console.log("Login: Invalid password");
  //         // res.send({
  //         //   message: "Invalid user",
  //         //   resultCode: 1,
  //         // });
  //         return done(false, null, { message: 'Incorrect user info.' });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err")
  //       res.send(err);
  //     });
  // }));
  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'id',
    passwordField: 'pwd',
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
        return done(null, result, { message: "password error", resultCode: 0});
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