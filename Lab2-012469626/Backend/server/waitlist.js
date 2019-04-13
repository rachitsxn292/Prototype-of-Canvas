var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.post('/',function(req,res){
  kafka.make_request('waitlist', req, function(err, result){
    if(err){
        console.log('Inside  waitlist  Error',err);
    }
    else{
            console.log(' Inside waitlist Result', result);
            res.send(result);
    }
  });
      });

      module.exports=router;