var express = require('express');

var router=express.Router();

const uploadAssignment=require('../../models/assignmentgrade');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var courseid=message.query.courseid;
    var email=message.query.email;
    console.log('CourseId in Assignment view',courseid,email);
    var query={courseid:courseid,email:email};
    uploadAssignment.find(query).exec().then(result=>{
      console.log("In Upload Assignment View",result);
      callback(null,result)//res.send(true);
    })
  };

  exports.handle_request = handle_request;