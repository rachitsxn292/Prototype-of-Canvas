var express = require('express');

var router=express.Router();

const logindata=require('../models/loginData');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    logindata.find().exec().then(result=>{
      console.log("In Message View",result);
      res.json(result);
    })
  });

  module.exports=router;