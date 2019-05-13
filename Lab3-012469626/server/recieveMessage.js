var express = require('express');

var router=express.Router();

const message123=require('../models/message');

var mongoose=require('mongoose');

router.get('/',function(req,res){
    var email=req.query.email;
    var query={recieveremail:email};
    message123.find(query).exec().then(result=>{
      console.log("In Recieve Message View",result);
      res.json(result);
    })
  });
  module.exports=router;