var express = require('express');

var router=express.Router();

const uploadfile=require('../models/uploadfile');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var courseid=req.query.courseid;
    console.log('CourseId in Lecture view',courseid);
    var query={courseid:courseid};
    uploadfile.find(query).exec().then(result=>{
      console.log("In Lecture View",result);
      res.json(result);
    })
  });

  module.exports=router;