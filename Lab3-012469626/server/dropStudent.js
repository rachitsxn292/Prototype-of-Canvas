var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

var mongoose=require('mongoose');
router.post('/',function(req,res){
    const {email}=req.body;
    const {courseid}=req.body;
    var query={email:email, courseid:courseid};
    enrolled.remove(query).exec().then(result=>{
    console.log(result);
    res.send(true);
    }).catch(err=>console.log(err));
  })

  module.exports=router;