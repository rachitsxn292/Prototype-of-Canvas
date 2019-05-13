var express = require('express');

var router=express.Router();

const assignment=require('../models/assignment');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var courseid=req.query.courseid;
    console.log('CourseId',courseid);
    var query={courseid:courseid};
    assignment.find(query).exec().then(result=>{
      console.log("In Student View Assignment",result);
      res.json(result);
    })
  });

  module.exports=router;