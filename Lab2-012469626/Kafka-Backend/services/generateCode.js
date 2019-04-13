var express = require('express');

var router=express.Router();

const codes=require('../../models/codes');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');


function handle_request(message, callback){
    const {email}=message.body;
    const {courseid}=message.body;
  
    var code=parseInt(Math.random()*(9999-1000)+1000);
    const entry = new codes({
      _id: new mongoose.Types.ObjectId(),
      email:email,
      courseid: courseid,
      codes:code
    })
  
    console.log('Data Entered in Codes');
    entry.save().then(result=>{
      console.log(res);
      callback(null,true)//res.send(true);
    }).catch(err=>console.log(err));
  };

  exports.handle_request = handle_request;