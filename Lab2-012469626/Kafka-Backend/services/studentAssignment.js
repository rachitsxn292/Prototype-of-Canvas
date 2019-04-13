var express = require('express');

var router=express.Router();

const assignment=require('../../models/assignment');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var courseid=message.query.courseid;
    console.log('CourseId',courseid);
    var query={courseid:courseid};
    assignment.find(query).exec().then(result=>{
      console.log("In Student View Assignment",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;