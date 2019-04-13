var express = require('express');

var router=express.Router();

const coursedetails=require('../../models/courseDetails');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var search=message.query.search;
    var query={courseid:search};
    coursedetails.find(query).exec().then(result=>{
      console.log("In Search View",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;