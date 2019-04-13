var express = require('express');

var router=express.Router();

const logindata=require('../models/loginData');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.post('/',function(req,res){
  kafka.make_request('updateprofile', req, function(err, result){
    if(err){
        console.log('Inside Update Profile  Error',err);
    }
    else{
            console.log(' Inside Update Profile  Result', result);
            res.send(result);
    }
  });
    })
    module.exports=router;