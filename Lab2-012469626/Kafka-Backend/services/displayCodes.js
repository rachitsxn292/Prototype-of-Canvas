var express = require('express');

var router=express.Router();

const codes=require('../../models/codes');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});


function handle_request(message, callback){
    codes.find().exec().then(result=>{
      console.log("In Code Data Table",result);
      callback(null,result);//res.json(result);
    })
  };

  exports.handle_request = handle_request;