var express = require('express');

var router=express.Router();

var md5= require('md5');

const assignment=require('../models/assignment');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.post('/',function(req,res){
  kafka.make_request('facultyCreateAssignment', req, function(err, result){
    if(err){
        console.log('Inside Faculty Create Assignment Error',err);
    }
    else{
            console.log(' Inside Faculty Create Assignment Result', result);
            res.send(result);
    }
  });
  
  });

  module.exports=router;