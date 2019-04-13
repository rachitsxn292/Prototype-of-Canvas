var express = require('express');

var router=express.Router();

const quiz=require('../models/quiz');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.post('/', function(req,res){
  kafka.make_request('quiz', req, function(err, result){
    if(err){
        console.log('Inside Quiz Calculated Error',err);
    }
    else{
            console.log(' Inside Quiz Calculated Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;
  