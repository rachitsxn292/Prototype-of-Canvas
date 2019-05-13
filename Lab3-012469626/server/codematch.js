var express = require('express');

var router=express.Router();

const codes=require('../models/codes');

const enrolled=require('../models/enrolled');

var mongoose=require('mongoose');

router.post('/',function(req,res){
    var code=req.body.EnterCode;
    var email=req.body.email;
    var courseid=req.body.courseid;
    var z="E";
    var query={email:email};
    codes.find(query).exec().then(result=>{
      console.log("In Code Match",result[0].codes);
      if(result[0].codes===code)
      {
        var query2={$set: {status:z}};
        enrolled.update({email:email,courseid:courseid},query2).exec().then(result=>{
          console.log(result);
        }).catch(err=>console.log(err));
          
      }
      res.send('true');
    })
  })

  module.exports=router;