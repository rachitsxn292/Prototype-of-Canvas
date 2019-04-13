var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('GeneratePermissionCode', req, function(err, result){
    if(err){
        console.log('Inside Generate Permission Code Error',err);
    }
    else{
            console.log(' Inside Generate Permission Code Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;