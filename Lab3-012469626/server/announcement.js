var express = require('express');

var router=express.Router();

const announcements=require('../models/announcement');

var mongoose=require('mongoose');

router.post('/',function(req,res){
    var courseid=req.body.courseid;
    var announcementHeading= req.body.announcementHeading;
    var announcementText=req.body.announcementText;
    const entry = new announcements({
      _id: new mongoose.Types.ObjectId(),
      heading: req.body.announcementHeading,
      text: req.body.announcementText,
      courseid: req.body.courseid,
      
    })
  
    console.log('Data Entered in Announcements');
    entry.save().then(result=>{
      console.log(res);
      res.send(true);
    }).catch(err=>console.log(err));
  res.send(true);
  
  });

  module.exports=router;