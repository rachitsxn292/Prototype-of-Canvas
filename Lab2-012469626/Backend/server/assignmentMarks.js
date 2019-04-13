var express = require('express');

var router=express.Router();

const uploadAssignment=require('../models/assignmentgrade');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');


router.post('/',function(req,res){
  kafka.make_request('assignmentMarks', req, function(err, result){
    if(err){
        console.log('Inside Assignment Marks Error',err);
    }
    else{
            console.log(' Inside Assignment Marks Result', result);
            res.send(result);
    }
  });
      
    })
module.exports=router;