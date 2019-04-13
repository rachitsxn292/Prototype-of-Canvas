var express = require('express');

var router=express.Router();

const uploadAssignment=require('../../models/assignmentgrade');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var email=message.query.email;
    var query={email:email};
    uploadAssignment.find(query).exec().then(result=>{
      console.log("In View Grades",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;