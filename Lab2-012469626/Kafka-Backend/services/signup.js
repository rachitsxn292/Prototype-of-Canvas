var express = require('express');

var router=express.Router();

var md5= require('md5');

const logindata=require('../../models/loginData');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
    var name= message.body.Name;
    var email=message.body.Email;
    var password=message.body.Password;
    password = md5(password);
    var role=message.body.Role;
    const entry = new logindata({
      _id: new mongoose.Types.ObjectId(),
      name: message.body.Name,
      username: message.body.Email,
      password: md5(message.body.Password),
      role: message.body.Role,
      phoneno: '',
      address: '',
      aboutme: '',
      city:'' ,
      country:'',
      company:'',
      school: '',
      hometown:'',
      gender:'',
      languages:'',
      picture:''
    })
    if(message.body.Name && message.body.Email)
    {
    console.log('Entered');
    entry.save().then(result=>{
      console.log(callback);
      callback(null,true)//res.send(true);
    }).catch(err=>console.log(err));
    callback(null,true)//res.send(true);
  }
  
  };

  exports.handle_request = handle_request;