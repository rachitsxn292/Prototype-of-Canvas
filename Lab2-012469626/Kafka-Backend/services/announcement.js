var express = require('express');

var router=express.Router();

const announcements=require('../../models/announcement');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var courseid=message.body.courseid;
    var announcementHeading= message.body.announcementHeading;
    var announcementText=message.body.announcementText;
    const entry = new announcements({
      _id: new mongoose.Types.ObjectId(),
      heading: message.body.announcementHeading,
      text: message.body.announcementText,
      courseid: message.body.courseid,
      
    })
  
    console.log('Data Entered in Announcements');
    entry.save().then(result=>{
      console.log(res);
      callback(null,true)//res.send(true);
    }).catch(err=>console.log(err));
  callback(null,true)//res.send(true);
  
  };

  exports.handle_request = handle_request;