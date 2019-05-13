const mongoose=require('mongoose');

const assignementSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    courseid: String,
    email:String,
    heading: String,
    text: String,
    
})

module.exports=mongoose.model('assignment',assignementSchema);