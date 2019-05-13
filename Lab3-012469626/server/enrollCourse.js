var express = require('express');

var router=express.Router();

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');


router.get('/',function(req,res){
  let limit = Number(req.query.limit);
  let skip = limit*Number(req.query.t);
    coursedetails.find().limit(limit).skip(skip).exec().then(result=>{
      console.log("In Enroll Course Dashboard",result);
      res.json(result);
    })
  });
    
  module.exports=router;