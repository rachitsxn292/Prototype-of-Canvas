var express = require('express');

var router=express.Router();

const codes=require('../models/codes');

const enrolled=require('../models/enrolled');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.post('/',function(req,res){
  kafka.make_request('codematch', req, function(err, result){
    if(err){
        console.log('Inside Codematch Error',err);
    }
    else{
            console.log(' Inside Codematch Result', result);
            res.send(result);
    }
  });
  })

  module.exports=router;