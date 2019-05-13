const mongoose=require('mongoose');

const announcementSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    heading: String,
    text: String,
    courseid: String,
})

module.exports=mongoose.model('announcements',announcementSchema);