var express = require('express');

var router=express.Router();

const message123=require('../../models/message');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var email=message.query.email;
    var query={recieveremail:email};
    message123.find(query).exec().then(result=>{
      console.log("In Recieve Message View",result);
      callback(null,result);//res.json(result);
    })
  };
  exports.handle_request = handle_request;