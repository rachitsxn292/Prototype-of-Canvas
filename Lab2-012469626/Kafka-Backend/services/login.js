var express = require('express');

var router=express.Router();

var md5= require('md5');

const loginData=require('../../models/loginData');
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
  var x=message.body.id;
  var y=message.body.pwd;
  y=md5(y);
  var z=message.body.login;
  var flag = '';
  var query={username: x, password: y};
  console.log('RESULT RESULT RESULT KAFKA', y);
//   callback(null, {username: 'rachit.saxena@sjsu.edu', password: 'e818202f38c75b1a88c00d4cd13ac636', role: 'S'});
  loginData.find(query).exec().then(result=>{
    // console.log(result);
    console.log('INSIDE RESULT RESULT RESULT KAFKA', y);
    callback(null, result);
  }).catch(err=>{
      callback(err, null);
  })
}

exports.handle_request = handle_request;