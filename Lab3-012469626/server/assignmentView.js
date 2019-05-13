var express = require('express');

var router=express.Router();

const uploadAssignment=require('../models/assignmentgrade');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var courseid=req.query.courseid;
    var email=req.query.email;
    console.log('CourseId in Assignment view',courseid,email);
    var query={courseid:courseid,email:email};
    uploadAssignment.find(query).exec().then(result=>{
      console.log("In Upload Assignment View",result);
      res.json(result);
    })
  });

  module.exports=router;