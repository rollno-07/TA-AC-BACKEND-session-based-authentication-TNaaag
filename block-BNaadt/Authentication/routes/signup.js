var express = require('express');
const session = require('express-session');
var router = express.Router();
var User= require('../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

//login
router.get('/login', function(req, res, next) {
  var error=req.flash('error')[0]
  console.log(req.session)
  res.render('login',{error});
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
    req.flash('error','Email/Password required!')
    return res.redirect('/signup/login')
  }
  User.findOne({email},(err,user)=>{
    if(err) return next(err)
    //no user
    if(!user){
      req.flash('error','User is not register')
      return res.redirect('/signup/login')
    }
    //user
    user.verifyPassword(password,(err,result)=>{
      if(err) return next(err)
      console.log(result)
      if(!result){
         req.flash('error','Wrong password')
          return res.redirect('/signup/login')
      }
      //session
      if(result){
        req.session.userId=user.id
         return res.redirect('/signup/login')}
    })
    
    
  })
})

//logout
router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.clearCookie('connect.sid')
  res.redirect('/signup/login')
})

module.exports = router;
