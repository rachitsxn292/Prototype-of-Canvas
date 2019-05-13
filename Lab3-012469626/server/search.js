var express = require('express');

var router=express.Router();

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var search=req.query.search;
    var query={courseid:search};
    coursedetails.find(query).exec().then(result=>{
      console.log("In Search View",result);
      res.json(result);
    })
  });

  module.exports=router;