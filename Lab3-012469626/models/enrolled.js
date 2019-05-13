const mongoose=require('mongoose');

const enrolledSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:String,
    courseid: String,
    status:String,
    coursename:String
    
})

module.exports=mongoose.model('enrolled',enrolledSchema);