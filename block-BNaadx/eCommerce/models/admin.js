var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt');

var adminSchema= new Schema({
    adminName:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    mobile:{type:Schema.Types.ObjectId, ref:'AllowedAdmin'},
    password:{type:String, min:5,required:true},
    productId:{type:Schema.Types.ObjectId,ref:'Product'},
},{timestamps:true});

adminSchema.pre('save',function(next){
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

adminSchema.methods.verifyMobile= function(password,cb){
    bcrypt.compare(password,this.password,(err,result)=>{
        return cb(err,result)
    })
}



var Admin=mongoose.model('Admin',adminSchema);

module.exports=Admin;