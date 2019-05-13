var express = require('express');

var router=express.Router();

const quiz=require('../models/quiz');

var mongoose=require('mongoose');


router.post('/',function(req,res){
    var courseid=req.body.courseid;
    var ques=req.body.ques;
    var op1=req.body.op1;
    var op2=req.body.op2;
    var op3=req.body.op3;
    var op4=req.body.op4;
    var result=req.body.result;
    const entry = new quiz({
      _id: new mongoose.Types.ObjectId(),
      courseid: req.body.courseid,
      ques:req.body.ques,
      option1: req.body.op1,
      option2: req.body.op2,
      option3: req.body.op3,
      option4: req.body.op4,
      result:req.body.result
      
    })
  
    console.log('Data Entered in Quiz Creation');
    entry.save().then(result=>{
      console.log(res);
      res.send(true);
    }).catch(err=>console.log(err));
  res.send(true);
  
  });


  module.exports=router;