var express = require('express');

var router=express.Router();

const uploadAssignment=require('../models/assignmentgrade');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var courseid=req.query.courseid;
    console.log('CourseId in Submit Assignment view',courseid);
    var query={courseid:courseid};
    uploadAssignment.find(query).exec().then(result=>{
      console.log("In Upload Assignment View",result);
      res.json(result);
    })
  });

  module.exports=router;