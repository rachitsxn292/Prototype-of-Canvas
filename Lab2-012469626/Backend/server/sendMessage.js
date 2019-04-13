var express = require('express');

var router=express.Router();

const message123=require('../models/message');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');


router.post('/',function(req,res){
  kafka.make_request('search', req, function(err, result){
    if(err){
        console.log('Inside Send Message Error',err);
    }
    else{
            console.log(' Inside Send Message Result', result);
            res.send(result);
    }
  });
  })

  module.exports=router;