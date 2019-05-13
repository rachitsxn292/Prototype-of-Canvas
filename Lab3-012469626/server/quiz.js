var express = require('express');

var router=express.Router();

const quiz=require('../models/quiz');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var courseid=req.query.courseid;
    console.log('CourseId IN QUIZ',courseid);
    var query={courseid:courseid};
    quiz.find(query).exec().then(result=>{
      console.log("Inside View Quiz",result);
      res.json(result);
    })
  });

  
  module.exports=router;