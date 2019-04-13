var express = require('express');

var router=express.Router();

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('search', req, function(err, result){
    if(err){
        console.log('Inside Search Error',err);
    }
    else{
            console.log(' Inside Search Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;