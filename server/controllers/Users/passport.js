const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require("../../models");
const encrypt = require("./encrypt");

module.exports = (req, res) => {
    passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
      done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    });
  
    passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
      User.findById(user, (err, user) => {
        done(null, user); // 여기의 user가 req.user가 됨
      });
    });
  
    passport.use(new LocalStrategy({ // local 전략을 세움
      usernameField: 'id',
      passwordField: 'pwd',
      session: true, // 세션에 저장 여부
      passReqToCallback: true,  //req 사용여부
    }, (req, username, password, done) => {
      models.Users.findOne({
        where: {
          User_id: username,
        },
      })
        .then((result) => {
          if (
            encrypt.isPasswordSame(password, result.User_password)
          ) { //패스워드 일치
            if(req.session.key){
              console.log('session valid (' + req.session.key + ')');
              res.send('session is destroyed');
            } else{
              req.session.key = req.body.User_id;
              console.log('session save success (' + req.session.key + ')');
              res.send('session save success');
            }
            // Check password
            res.send({
              User_id: result.User_id,
              User_name: result.User_name,
              //User_lastlogin:
              User_position: result.User_position,
              resultCode: 0,
            });
            return done(null, result); 
          } else {
            console.log("Login: Invalid password");
            res.send({
              message: "Invalid user",
              resultCode: 1,
            });
            return done(false, null, { message: 'Incorrect user info.' });
          }
        })
        .catch((err) => {
          res.send(err);
        });
    }));
  };