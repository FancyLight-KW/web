var express = require('express');
var router = express.Router();
const sql = require("../models/db.js");

//testcode
router.post('/register', (req, res) => {

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  sql.query(
    "INSERT INTO User_ID_PWD (User_ID, User_PWD) VALUES (?,?)", 
    [email, password],
    (err, result) => {
      console.log(err);
    }
  );
});

router.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  sql.query(
    "SELECT * FROM User_ID_PWD WHERE User_ID = ? AND User_PWD = ?", 
    [email, password],
    (err, result) => {

      if(err){
        res.send({err: err});
      } 

      if(result.length > 0){
        res.send(result);
        } else {
        res.send({message: "Wrong username/password combination!"});
      }
    }
  );
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
