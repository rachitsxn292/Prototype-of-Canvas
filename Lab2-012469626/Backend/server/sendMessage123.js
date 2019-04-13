var express = require('express');

var router=express.Router();

const logindata=require('../models/loginData');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('sendMessage123', req, function(err, result){
    if(err){
        console.log('Inside Send Message123 Error',err);
    }
    else{
            console.log(' Inside Send Message123 Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;