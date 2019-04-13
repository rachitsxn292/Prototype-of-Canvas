var express = require('express');

var router=express.Router();

const announcements=require('../models/announcement');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');

router.post('/',function(req,res){
  kafka.make_request('announcement', req, function(err, result){
    if(err){
        console.log('Inside Announcement',err);
    }
    else{
            console.log('Inside Announcement Executed', result);
            res.send(result);
    }
  });
  });

  module.exports=router;
  