var express = require('express');

var router=express.Router();

const announcements=require('../models/announcement');

var mongoose=require('mongoose');

var kafka = require('./kafka/client');


router.get('/',function(req,res){
  kafka.make_request('courseAnnouncement', req, function(err, result){
    if(err){
        console.log('Inside Course Announcement  Error',err);
    }
    else{
            console.log(' Inside Course Announcement Result', result);
            res.send(result);
    }
  });
  });

  module.exports=router;