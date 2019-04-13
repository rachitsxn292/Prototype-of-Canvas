var express = require('express');

var router=express.Router();

const codes=require('../models/codes');

var kafka = require('./kafka/client');

var mongoose=require('mongoose');
router.get('/',function(req,res){
  kafka.make_request('displayCodes', req, function(err, result){
    if(err){
        console.log('Inside Display Codes Error',err);
    }
    else{
            console.log(' Inside Display Codes Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;