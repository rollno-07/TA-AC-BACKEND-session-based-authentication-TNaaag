var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var productSchema= new Schema({
    productName:{type:String, required:true},
    category:{type:String, required:true},
    price:{type:Number,required:true},
    commentId:{type:Schema.Types.ObjectId, ref:'Comment'},
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    availabe:{type:Boolean,required:true},
    like:{type:Number,default:0}
},{timestamps:true});





var Product=mongoose.model('Admin',productSchema);

module.exports=Product;