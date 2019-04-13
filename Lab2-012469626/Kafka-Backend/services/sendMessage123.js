var express = require('express');

var router=express.Router();

const logindata=require('../../models/loginData');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
    logindata.find().exec().then(result=>{
      console.log("In Message View",result);
      callback(null,result);
    })
  };

  exports.handle_request = handle_request;