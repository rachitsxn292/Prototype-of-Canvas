const mongoose=require('mongoose');

const codesSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    courseid: String,
    email:String,
    codes:String
    
})

module.exports=mongoose.model('codes',codesSchema);