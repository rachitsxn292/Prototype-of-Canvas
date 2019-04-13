var express = require('express');

var router=express.Router();

const coursedetails=require('../../models/courseDetails');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');


function handle_request(message, callback){
  
    coursedetails.find().exec().then(result=>{
      console.log("In Enroll Course Dashboard",result);
      callback(null,result)//res.json(result);
    })
  };
    
  exports.handle_request = handle_request;