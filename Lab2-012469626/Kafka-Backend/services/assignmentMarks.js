var express = require('express');

var router=express.Router();

const uploadAssignment=require('../../models/assignmentgrade');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});


function handle_request(message, callback){
    var marks= message.body.marks;
    var courseid=message.body.courseid;
    var query={$set: {assignmentgrade:marks}};
    uploadAssignment.update({courseid:courseid},query).exec().then(result=>{
      console.log(result);
      callback(null,true);//res.send(true);
    }).catch(err=>console.log(err));
      
    }
    exports.handle_request = handle_request;