const mongoose=require('mongoose');

const uploadAssignmentSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    courseid: String,
    email:String,
    assignmentlocation:String,
    assignmentgrade:String
    
})

module.exports=mongoose.model('uploadAssignment',uploadAssignmentSchema);