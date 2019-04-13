var express = require('express');

var router=express.Router();

const logindata=require('../../models/loginData');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');


function handle_request(message, callback){
    var email=message.query.email;
    console.log('Profile in  view',email);
    var query={username:email};
    logindata.find(query).exec().then(result=>{
      console.log("In Update Profile Upload",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;