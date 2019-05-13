const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    senderemail:String,
    recieveremail: String,
    message: String,
    
})

module.exports=mongoose.model('message',messageSchema);