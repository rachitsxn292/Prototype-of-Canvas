var express = require('express');

var router=express.Router();

const coursedetails=require('../../models/courseDetails');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');
function handle_request(message, callback){
    var courseid=message.body.courseid;
    var coursename=message.body.coursename;
    var coursedept=message.body.coursedept;
    var coursedes=message.body.coursedes;
    var courseroom=message.body.courseroom;
    var coursecapacity=message.body.coursecapacity;
    var waitlistcapacity=message.body.waitlistcapacity;
    var courseteam=message.body.courseteam;
    var email=message.body.email;
    const entry = new coursedetails({
      _id: new mongoose.Types.ObjectId(),
      courseid: message.body.courseid,
      coursename: message.body.coursename,
      coursedept: message.body.coursedept,
      coursedes: message.body.coursedes,
      courseroom: message.body.courseroom,
      coursecapacity: message.body.coursecapacity,
      waitlistcapacity: message.body.waitlistcapacity,
      courseteam: message.body.courseteam,
      email: message.body.email
    })

    console.log('Data Entered in Course Details');
    entry.save().then(result=>{
      console.log(res);
      callback(null,true)//res.send(true);
    }).catch(err=>console.log(err));
  callback(null,true)//res.send(true);
  
  };

  exports.handle_request = handle_request;