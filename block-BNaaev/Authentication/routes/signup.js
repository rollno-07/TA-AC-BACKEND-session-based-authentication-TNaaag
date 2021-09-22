var express = require('express');
var router = express.Router();
var User= require('../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

//login
router.get('/login', function(req, res, next) {
  res.render('login');
});

//signup
router.post('/signedup',(req,res,next)=>{
User.create(req.body,(err,user)=>{
  if(err) return next(err)
  res.redirect('/signup/login')
})
})

module.exports = router;
