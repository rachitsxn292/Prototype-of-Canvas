var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');

router.post('/',function(req,res){
    var email=req.body.email;
    var courseid=req.body.courseid;
        console.log('Course Dropped',email,courseid);
        var query={email:email, courseid:courseid};
        enrolled.remove(query).exec().then(result=>{
        console.log(result);
        // res.send(true);
        abc();
        }).catch(err=>console.log(err));
      
        function abc(){
          var query={$inc:{coursecapacity:1}};
          coursedetails.update({courseid: req.body.courseid},query).exec().then(result=>{
            console.log("Inside Drop Course Increment",result);
            res.send(true);
          }).catch(err=>console.log(err));
        }
      });

      module.exports=router;