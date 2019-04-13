var express = require('express');

var router=express.Router();

const uploadAssignment=require('../models/assignmentgrade');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.get('/',function(req,res){
  kafka.make_request('assignmentView', req, function(err, result){
    if(err){
        console.log('Inside AssignmentView Error',err);
    }
    else{
            console.log(' Inside AssignmentView  Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;