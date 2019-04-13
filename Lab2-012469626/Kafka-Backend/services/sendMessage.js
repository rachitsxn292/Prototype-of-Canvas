var express = require('express');

var router=express.Router();

const message123=require('../../models/message');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');


function handle_request(message, callback){
    var email=message.body.email;
    var role= message.body.role;
    var message=message.body.message;
    var senderemail=message.body.senderemail;
    const entry = new message123({
      _id: new mongoose.Types.ObjectId(),
      senderemail:email,
      recieveremail: senderemail,
      message: message,
      
    })
  
    console.log('Data Entered in Message');
    entry.save().then(result=>{
      console.log(res);
      callback(null,true)//res.send(true);
    }).catch(err=>console.log(err));
  }

  exports.handle_request = handle_request;