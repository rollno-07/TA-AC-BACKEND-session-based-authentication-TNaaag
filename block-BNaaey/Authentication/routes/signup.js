var express = require('express');
var router = express.Router();
var User= require('../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

//login
router.get('/login', function(req, res, next) {
  console.log(req.session)
  res.render('login');
});

//signup
router.post('/signedup',(req,res,next)=>{
User.create(req.body,(err,user)=>{
  if(err) return next(err)
  res.redirect('/signup/login')
})
})

router.post('/login',(req,res,next)=>{
  var {email,password}=req.body
  console.log(email,password)
  if(!email || !password){
    return res.redirect('/signup/login')
  }
  User.findOne({email},(err,user)=>{
    if(err) return next(err)
    //no user
    if(!user){
      return res.redirect('signup/login')
    }
    //user
    user.verifyPassword(password,(err,result)=>{
      if(err) return next(err)
      if(!result){
        res.redirect('/signup/login')
      }
    })
    //session
    req.session.userId=user.id
    res.redirect('/signup/login')
  })
})

module.exports = router;
