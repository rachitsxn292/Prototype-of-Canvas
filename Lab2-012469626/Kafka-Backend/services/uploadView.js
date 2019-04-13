var express = require('express');

var router=express.Router();

const uploadfile=require('../../models/uploadfile');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var courseid=message.query.courseid;
    console.log('CourseId in upload view',courseid);
    var query={courseid:courseid};
    uploadfile.find(query).exec().then(result=>{
      console.log("In Upload View",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;