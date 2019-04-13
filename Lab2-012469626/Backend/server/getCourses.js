var express = require('express');

var router=express.Router();

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('getCourses', req, function(err, result){
    if(err){
        console.log('Inside Get Courses  Error',err);
    }
    else{
            console.log(' Inside Generate Courses Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;