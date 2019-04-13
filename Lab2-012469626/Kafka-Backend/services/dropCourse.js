var express = require('express');

var router=express.Router();

const enrolled=require('../../models/enrolled');

const coursedetails=require('../../models/courseDetails');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
    var email=message.body.email;
    var courseid=message.body.courseid;
        console.log('Course Dropped',email,courseid);
        var query={email:email, courseid:courseid};
        enrolled.remove(query).exec().then(result=>{
        console.log(result);
        // res.send(true);
        abc();
        }).catch(err=>console.log(err));
      
        function abc(){
          var query={$inc:{coursecapacity:1}};
          coursedetails.update({courseid: message.body.courseid},query).exec().then(result=>{
            console.log("Inside Drop Course Increment",result);
            callback(null,true)//res.send(true);
          }).catch(err=>console.log(err));
        }
      };

      exports.handle_request = handle_request;