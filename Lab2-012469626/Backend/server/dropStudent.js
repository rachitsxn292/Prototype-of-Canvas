var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

var kafka = require('./kafka/client');

var mongoose=require('mongoose');

router.post('/',function(req,res){
  kafka.make_request('dropStudent', req, function(err, result){
    if(err){
        console.log('Inside Drop student Error',err);
    }
    else{
            console.log(' Inside Drop Student Result', result);
            res.send(result);
    }
  });
  })

  module.exports=router;