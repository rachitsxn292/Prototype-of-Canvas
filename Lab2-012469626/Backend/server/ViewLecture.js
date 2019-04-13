var express = require('express');

var router=express.Router();

const uploadfile=require('../models/uploadfile');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('ViewLecture', req, function(err, result){
    if(err){
        console.log('Inside  View lecture  Error',err);
    }
    else{
            console.log(' Inside Upload lecture  Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;