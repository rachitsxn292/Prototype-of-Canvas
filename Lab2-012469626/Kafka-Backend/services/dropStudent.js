var express = require('express');

var router=express.Router();

const enrolled=require('../../models/enrolled');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');


function handle_request(message, callback){
    const {email}=message.body;
    const {courseid}=message.body;
    var query={email:email, courseid:courseid};
    enrolled.remove(query).exec().then(result=>{
    console.log(result);
   callback(null,true)//res.send(true);
    }).catch(err=>console.log(err));
  }

  exports.handle_request = handle_request;