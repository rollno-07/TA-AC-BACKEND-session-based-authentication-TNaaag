var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt');

var userSchema= new Schema({
    userName:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    mobile:{type:Number,min:10,required:true},
    productId:{type:Schema.Types.ObjectId, ref:'Product'},
    password:{type:String, min:5,required:true}
},{timestamps:true});

userSchema.pre('save',function(next){
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

userSchema.methods.verifyPassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,result)=>{
        return cb(err,result)
    })
}



var User=mongoose.model('User',adminSchema);

module.exports=User;