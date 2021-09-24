var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var commentSchema= new Schema({
    content:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    productId:{type:Schema.Types.ObjectId,ref:'Product'},
    like:{type:Number,default:0}
},{timestamps:true});





var Comment=mongoose.model('Admin',commentSchema);

module.exports=Comment;