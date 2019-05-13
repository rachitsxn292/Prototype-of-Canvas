var express = require('express');

var router=express.Router();

const announcements=require('../models/announcement');

var mongoose=require('mongoose');


router.get('/',function(req,res){
    var courseid=req.query.courseid;
    console.log('CourseId',courseid);
    var query={courseid:courseid};
    announcements.find(query).exec().then(result=>{
      console.log("In Student View Announcements",result);
      res.json(result);
    })
  });

  module.exports=router;