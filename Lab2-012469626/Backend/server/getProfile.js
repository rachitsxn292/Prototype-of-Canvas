var express = require('express');

var router=express.Router();

const logindata=require('../models/loginData');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('getProfile', req, function(err, result){
    if(err){
        console.log('Inside Get Profile Error',err);
    }
    else{
            console.log(' Inside Get Profile Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;