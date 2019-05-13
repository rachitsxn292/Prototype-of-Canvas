var express = require('express');

var router=express.Router();

const enrolled=require('../models/enrolled');

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');


router.post('/',function(req,res){
    var courseid=req.body.courseid;
    var coursename=req.body.coursename;
    var email=req.body.email;
    var status=req.body.waitlist;
    const entry = new enrolled({
      _id: new mongoose.Types.ObjectId(),
      email:req.body.email,
      courseid: req.body.courseid,
      status:req.body.waitlist,
      coursename:req.body.coursename
      })
        console.log('Course Waitlist');
        entry.save().then(result=>{
        console.log(result);
        // res.send(true);
        abc();
        }).catch(err=>console.log(err));
      
        function abc(){
          var query={$inc: {waitlistcapacity:-1}};
          coursedetails.update({courseid: req.body.courseid},query).exec().then(result=>{
            console.log("Inside Enroll Course Decrement",result);
            res.send(true);
          }).catch(err=>console.log(err));
        }
      });

      module.exports=router;