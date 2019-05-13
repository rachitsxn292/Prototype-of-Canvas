var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var courseid=req.query.courseid;
    let limit = Number(req.query.limit);
    let skip = limit*Number(req.query.t);
    console.log('CourseId',courseid);
    var query={courseid:courseid};
    enrolled.find(query).limit(limit).skip(skip).exec().then(result=>{
      console.log("In View Collegues",result,courseid);
      res.json(result);
    })
  });

  module.exports=router;