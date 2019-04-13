var express = require('express');

var router=express.Router();

var md5= require('md5');

const logindata=require('../models/loginData');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.post('/',function(req,res){
  kafka.make_request('signup', req, function(err, result){
    if(err){
        console.log('Inside Sign Up  Error',err);
    }
    else{
            console.log(' Inside Sign Up  Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;