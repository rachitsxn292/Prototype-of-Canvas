var express = require('express');

var router=express.Router();

const codes=require('../models/codes');

var mongoose=require('mongoose');


router.post('/',function(req,res){
    const {email}=req.body;
    const {courseid}=req.body;
  
    var code=parseInt(Math.random()*(9999-1000)+1000);
    const entry = new codes({
      _id: new mongoose.Types.ObjectId(),
      email:email,
      courseid: courseid,
      codes:code
    })
  
    console.log('Data Entered in Codes');
    entry.save().then(result=>{
      console.log(res);
      res.send(true);
    }).catch(err=>console.log(err));
  });

  module.exports=router;