var express = require('express');

var router=express.Router();

const enrolled=require('../../models/enrolled');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var courseid=message.query.courseid;
    var x="W"
    console.log('CourseId',courseid);
    var query={courseid:courseid,status:x};
    enrolled.find(query).exec().then(result=>{
      console.log("In Grant Codes",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;