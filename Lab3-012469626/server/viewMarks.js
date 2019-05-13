var express = require('express');

var router=express.Router();

const uploadAssignment=require('../models/assignmentgrade');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var email=req.query.email;
    var query={email:email};
    uploadAssignment.find(query).exec().then(result=>{
      console.log("In View Grades",result);
      res.json(result);
    })
  });

  module.exports=router;