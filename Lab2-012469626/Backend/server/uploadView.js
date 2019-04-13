var express = require('express');

var router=express.Router();

const uploadfile=require('../models/uploadfile');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('uploadView', req, function(err, result){
    if(err){
        console.log('Inside Upload View  Error',err);
    }
    else{
            console.log(' Inside Upload View  Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;