var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var courseid=req.query.courseid;
    var x="W"
    console.log('CourseId',courseid);
    var query={courseid:courseid,status:x};
    enrolled.find(query).exec().then(result=>{
      console.log("In Grant Codes",result);
      res.json(result);
    })
  });

  module.exports=router;