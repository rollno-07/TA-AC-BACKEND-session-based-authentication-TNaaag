var express = require('express');
var router = express.Router();

/* GET users listing. */

//signup
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//login
router.get('/login',(req,res,next)=>{
  res.render('login')
})

module.exports=router;
