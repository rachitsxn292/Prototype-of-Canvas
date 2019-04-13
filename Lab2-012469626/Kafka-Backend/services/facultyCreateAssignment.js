var express = require('express');

var router=express.Router();

var md5= require('md5');

const assignment=require('../../models/assignment');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var assignmentHeading=message.body.assignmentHeading;
    var assignmentText=message.body.assignmentText;
    var email=message.body.email;
    var courseid=message.body.courseid;
    const entry = new assignment({
      _id: new mongoose.Types.ObjectId(),
      courseid: message.body.courseid,
      email:message.body.email,
      heading: message.body.assignmentHeading,
      text: message.body.assignmentText,
      
      
    })
  
    console.log('Data Entered in Assignements');
    entry.save().then(result=>{
      console.log(res);
      callback(null,true)//res.send(true);
    }).catch(err=>console.log(err));

  
  };

  exports.handle_request = handle_request;