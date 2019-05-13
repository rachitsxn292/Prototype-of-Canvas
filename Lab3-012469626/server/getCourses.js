var express = require('express');

var router=express.Router();

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var email=req.query.email;
    console.log('Email in Faculty View Courses', email);
    var query={email:email};
    coursedetails.find(query).exec().then(result=>{
      console.log("In Faculty Cards",result);
      res.json(result);
    })
  });

  module.exports=router;