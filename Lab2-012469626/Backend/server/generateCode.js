var express = require('express');

var router=express.Router();

const codes=require('../models/codes');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.post('/',function(req,res){
  kafka.make_request('generateCode', req, function(err, result){
    if(err){
        console.log('Inside Generate Code Error',err);
    }
    else{
            console.log(' Inside Generate Code Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;