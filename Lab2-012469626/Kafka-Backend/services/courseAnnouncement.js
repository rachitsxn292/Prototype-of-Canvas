var express = require('express');

var router=express.Router();

const announcements=require('../../models/announcement');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});


function handle_request(message, callback){
    var courseid=message.query.courseid;
    console.log('CourseId',courseid);
    var query={courseid:courseid};
    announcements.find(query).exec().then(result=>{
      console.log("In Student View Announcements",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;