var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('viewStudents', req, function(err, result){
    if(err){
        console.log('Inside  View Students  Error',err);
    }
    else{
            console.log(' Inside View Students  Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;