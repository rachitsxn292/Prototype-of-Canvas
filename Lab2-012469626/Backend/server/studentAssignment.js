var express = require('express');

var router=express.Router();

const assignment=require('../models/assignment');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('studentAssignment', req, function(err, result){
    if(err){
        console.log('Inside Student Assignment  Error',err);
    }
    else{
            console.log(' Inside Student Assignment  Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;