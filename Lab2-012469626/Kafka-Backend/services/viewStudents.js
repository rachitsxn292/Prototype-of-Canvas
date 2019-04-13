var express = require('express');

var router=express.Router();

const enrolled=require('../../models/enrolled');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
    var courseid=message.query.courseid;
    var query={courseid:courseid};
    enrolled.find(query).exec().then(result=>{
      console.log("In View Students",result,courseid);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;