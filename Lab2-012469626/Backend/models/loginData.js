const mongoose=require('mongoose');

const loginSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    username: String,
    password: String,
    studentid:String,
    role: String,
    phoneno: String,
    sid:String,
    address:String,
    aboutme: String,
    city: String,
    country:String,
    company:String,
    school: String,
    hometown:String,
    gender:String,
    languages:String,
    picture:String
})

module.exports=mongoose.model('loginData',loginSchema);