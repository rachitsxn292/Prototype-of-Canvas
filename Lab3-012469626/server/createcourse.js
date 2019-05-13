var express = require('express');

var router=express.Router();

const coursedetails=require('../models/courseDetails');

var mongoose=require('mongoose');

router.post('/',function(req,res){
    var courseid=req.body.courseid;
    var coursename=req.body.coursename;
    var coursedept=req.body.coursedept;
    var coursedes=req.body.coursedes;
    var courseroom=req.body.courseroom;
    var coursecapacity=req.body.coursecapacity;
    var waitlistcapacity=req.body.waitlistcapacity;
    var courseteam=req.body.courseteam;
    var email=req.body.email;
    const entry = new coursedetails({
      _id: new mongoose.Types.ObjectId(),
      courseid: req.body.courseid,
      coursename: req.body.coursename,
      coursedept: req.body.coursedept,
      coursedes: req.body.coursedes,
      courseroom: req.body.courseroom,
      coursecapacity: req.body.coursecapacity,
      waitlistcapacity: req.body.waitlistcapacity,
      courseteam: req.body.courseteam,
      email: req.body.email
    })

    console.log('Data Entered in Course Details');
    entry.save().then(result=>{
      console.log(res);
      res.send(true);
    }).catch(err=>console.log(err));
  res.send(true);
  
  });

  module.exports=router;