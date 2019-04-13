var express = require('express');

var router=express.Router();

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.post('/',function(req,res){
  kafka.make_request('createcourse', req, function(err, result){
    if(err){
        console.log('Inside Create Course Error',err);
    }
    else{
            console.log(' Inside Create Course Result', result);
            res.send(result);
    }
  });
  
  });

  module.exports=router;