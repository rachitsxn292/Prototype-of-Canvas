var express = require('express');

var router=express.Router();

const enrolled=require('../../models/enrolled');

const coursedetails=require('../../models/courseDetails');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
    var courseid=message.body.courseid;
    var coursename=message.body.coursename;
    var email=message.body.email;
    var status=message.body.enroll;
    console.log('Coursename', coursename, courseid, email, status);
  
    const entry = new enrolled({
      _id: new mongoose.Types.ObjectId(),
      email:message.body.email,
      courseid: message.body.courseid,
      status:message.body.enroll,
      coursename:message.body.coursename
      })
        console.log('Course Enrolled');
        entry.save().then(result=>{
        console.log(result);
        // res.send(true);
        abc();
        }).catch(err=>console.log(err));
      
        function abc(){
          var query={$inc: {coursecapacity:-1}};
          coursedetails.update({courseid: message.body.courseid},query).exec().then(result=>{
            console.log("Inside Enroll Course Decrement",result);
            callback(null,true)//res.send(true);
          }).catch(err=>console.log(err));
        }
      };

      exports.handle_request = handle_request;