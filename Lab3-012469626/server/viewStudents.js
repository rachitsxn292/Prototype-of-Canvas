var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var courseid=req.query.courseid;
    var query={courseid:courseid};
    enrolled.find(query).exec().then(result=>{
      console.log("In View Students",result,courseid);
      res.json(result);
    })
  });

  module.exports=router;