var express = require('express');

var router=express.Router();

const logindata=require('../models/loginData');

var mongoose=require('mongoose');


router.get('/',function(req,res){
    var email=req.query.email;
    console.log('Profile in  view',email);
    var query={username:email};
    logindata.find(query).exec().then(result=>{
      console.log("In Update Profile Upload",result);
      res.json(result);
    })
  });

  module.exports=router;