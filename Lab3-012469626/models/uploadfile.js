const mongoose=require('mongoose');

const uploadFileSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    courseid: String,
    email:String,
    filelocation:String,
    filename:String
    
})

module.exports=mongoose.model('uploadfile',uploadFileSchema);