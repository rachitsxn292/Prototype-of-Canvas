var express = require('express');

var router=express.Router();

const codes=require('../models/codes');

var mongoose=require('mongoose');
router.get('/',function(req,res){
    codes.find().exec().then(result=>{
      console.log("In Code Data Table",result);
      res.json(result);
    })
  });

  module.exports=router;