var express = require('express');

var router=express.Router();

const message123=require('../models/message');

var mongoose=require('mongoose');


router.post('/',function(req,res){
    var email=req.body.email;
    var role= req.body.role;
    var message=req.body.message;
    var senderemail=req.body.senderemail;
    const entry = new message123({
      _id: new mongoose.Types.ObjectId(),
      senderemail:email,
      recieveremail: senderemail,
      message: message,
      
    })
  
    console.log('Data Entered in Message');
    entry.save().then(result=>{
      console.log(res);
      res.send(true);
    }).catch(err=>console.log(err));
  })

  module.exports=router;