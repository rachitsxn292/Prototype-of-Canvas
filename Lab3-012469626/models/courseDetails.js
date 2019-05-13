const mongoose=require('mongoose');

const courseSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    courseid: String,
    coursename: String,
    coursedept: String,
    coursedes: String,
    courseroom: String,
    coursecapacity: Number,
    waitlistcapacity: Number,
    courseteam: String,
    email: String
})

module.exports=mongoose.model('courseDetails',courseSchema);