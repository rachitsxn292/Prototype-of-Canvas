var express = require('express');

var router=express.Router();

const coursedetails=require('../../models/courseDetails');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
    var email=message.query.email;
    console.log('Email in Faculty View Courses', email);
    var query={email:email};
    coursedetails.find(query).exec().then(result=>{
      console.log("In Faculty Cards",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;