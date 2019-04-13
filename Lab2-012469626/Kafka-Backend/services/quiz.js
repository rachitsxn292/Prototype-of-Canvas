var express = require('express');

var router=express.Router();

const quiz=require('../../models/quiz');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var courseid=message.query.courseid;
    console.log('CourseId IN QUIZ',courseid);
    var query={courseid:courseid};
    quiz.find(query).exec().then(result=>{
      console.log("Inside View Quiz",result);
      callback(null,result);//res.json(result);
    })
  };

  
  exports.handle_request = handle_request;