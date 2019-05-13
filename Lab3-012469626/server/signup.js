var express = require('express');

var router=express.Router();

var md5= require('md5');

const logindata=require('../models/loginData');

var mongoose=require('mongoose');

router.post('/',function(req,res){
    var name= req.body.Name;
    var email=req.body.Email;
    var password=req.body.Password;
    password = md5(password);
    var role=req.body.Role;
    const entry = new logindata({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.Name,
      username: req.body.Email,
      password: md5(req.body.Password),
      role: req.body.Role,
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
      console.log(res);
      res.send(true);
      }).catch(err=>console.log(err));
      res.send(true);
      }
  });

  module.exports=router;