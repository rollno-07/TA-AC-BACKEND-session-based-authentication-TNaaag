var mongoose=require('mongoose')

var Schema=mongoose.Schema
var bcrypt=require('bcrypt')

var signupSchema=new Schema({
    username:{type:String, required:true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
        
        
    },
    password:{
        type:String,
        required:true,
        min:5,
        required:true
        
        

    }

},{timestamps:true})

signupSchema.pre('save',function(next){
    if(this.password && this.isModified('password')){
      bcrypt.hash(this.password,10,(err,hashed)=>{
          if(err) return next(err);
          this.password=hashed;
          return next();
      })
    }
    else{
        next()
    }
    
})

signupSchema.methods.verifyPassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,result)=>{
        return cb(err,result)
    })
}

var User=mongoose.model('User',signupSchema);

module.exports=User;