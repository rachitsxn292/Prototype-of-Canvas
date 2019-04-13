var express = require('express');

var router=express.Router();

const uploadAssignment=require('../../models/assignmentgrade');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var courseid=message.query.courseid;
    console.log('CourseId in Submit Assignment view',courseid);
    var query={courseid:courseid};
    uploadAssignment.find(query).exec().then(result=>{
      console.log("In Upload Assignment View",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;