const mongoose=require('mongoose');

const quizSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    courseid: String,
    ques:String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    result:String
    
})

module.exports=mongoose.model('quiz',quizSchema);