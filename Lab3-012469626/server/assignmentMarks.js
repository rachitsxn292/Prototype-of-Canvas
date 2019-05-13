var express = require('express');

var router=express.Router();

const uploadAssignment=require('../models/assignmentgrade');

var mongoose=require('mongoose');


router.post('/',function(req,res){
    var marks= req.body.marks;
    var courseid=req.body.courseid;
    var query={$set: {assignmentgrade:marks}};
    uploadAssignment.update({courseid:courseid},query).exec().then(result=>{
      console.log(result);
      res.send(true);
    }).catch(err=>console.log(err));
      
    })
module.exports=router;