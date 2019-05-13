var express = require('express');

var router=express.Router();

var md5= require('md5');

const assignment=require('../models/assignment');

var mongoose=require('mongoose');



router.post('/',function(req,res){
    var assignmentHeading=req.body.assignmentHeading;
    var assignmentText=req.body.assignmentText;
    var email=req.body.email;
    var courseid=req.body.courseid;
    const entry = new assignment({
      _id: new mongoose.Types.ObjectId(),
      courseid: req.body.courseid,
      email:req.body.email,
      heading: req.body.assignmentHeading,
      text: req.body.assignmentText,
      
      
    })
  
    console.log('Data Entered in Assignements');
    entry.save().then(result=>{
      console.log(res);
      res.send(true);
    }).catch(err=>console.log(err));
  res.send(true);
  
  });

  module.exports=router;