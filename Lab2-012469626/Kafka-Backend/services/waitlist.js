var express = require('express');

var router=express.Router();

const enrolled=require('../../models/enrolled');

const coursedetails=require('../../models/courseDetails');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');


function handle_request(message, callback){
    var courseid=message.body.courseid;
    var coursename=message.body.coursename;
    var email=message.body.email;
    var status=message.body.waitlist;
    const entry = new enrolled({
      _id: new mongoose.Types.ObjectId(),
      email:message.body.email,
      courseid: message.body.courseid,
      status:message.body.waitlist,
      coursename:message.body.coursename
      })
        console.log('Course Waitlist');
        entry.save().then(result=>{
        console.log(result);
        // res.send(true);
        abc();
        }).catch(err=>console.log(err));
      
        function abc(){
          var query={$inc: {waitlistcapacity:-1}};
          coursedetails.update({courseid: message.body.courseid},query).exec().then(result=>{
            console.log("Inside Enroll Course Decrement",result);
            callback(null,true);//res.send(true);
          }).catch(err=>console.log(err));
        }
      };

      exports.handle_request = handle_request;