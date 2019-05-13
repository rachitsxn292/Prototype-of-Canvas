var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

var mongoose=require('mongoose');


router.get('/',function(req,res){
    var email=req.query.email;
    var x="E";
    var query={email:email,status:x};
    enrolled.find(query).exec().then(result=>{
      console.log("In Student View Courses",result);
      res.json(result);
    })
  });

  module.exports=router;