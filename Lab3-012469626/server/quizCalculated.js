var express = require('express');

var router=express.Router();

const quiz=require('../models/quiz');

var mongoose=require('mongoose');

router.post('/', function(req,res){
    var option=req.body.option;
    var email=req.body.email;
    var courseid=req.body.courseid;
    var query="INSERT INTO quizanswer (EMAIL,COURSEID,OPTIONS) VALUES ('"+email+"','"+courseid+"','"+option+"')";
    connection.query(query,function(err,result)
    {
      if(err) 
      throw err;
      res.send(true);
    });
  });

  module.exports=router;
  