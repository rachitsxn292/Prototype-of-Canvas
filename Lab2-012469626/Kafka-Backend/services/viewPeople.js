var express = require('express');

var router=express.Router();

const enrolled=require('../../models/enrolled');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
    var courseid=message.query.courseid;
    let limit = Number(message.query.limit);
    let skip = limit*Number(message.query.t);
    console.log('CourseId',courseid);
    var query={courseid:courseid};
    enrolled.find(query).limit(limit).skip(skip).exec().then(result=>{
      console.log("In View Collegues",result,courseid);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;