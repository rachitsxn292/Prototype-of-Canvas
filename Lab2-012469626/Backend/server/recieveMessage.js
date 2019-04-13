var express = require('express');

var router=express.Router();

const message123=require('../models/message');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('quiz', req, function(err, result){
    if(err){
        console.log('Inside Recieve Message Error',err);
    }
    else{
            console.log(' Inside Recieve Message Result', result);
            res.send(result);
    }
  });
  });
  module.exports=router;