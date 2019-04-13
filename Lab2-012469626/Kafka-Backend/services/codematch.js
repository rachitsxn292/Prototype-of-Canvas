var express = require('express');

var router=express.Router();

const codes=require('../../models/codes');

const enrolled=require('../../models/enrolled');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var code=message.body.EnterCode;
    var email=message.body.email;
    var courseid=message.body.courseid;
    var z="E";
    var query={email:email};
    codes.find(query).exec().then(result=>{
      console.log("In Code Match",result[0].codes);
      if(result[0].codes===code)
      {
        var query2={$set: {status:z}};
        enrolled.update({email:email,courseid:courseid},query2).exec().then(result=>{
          console.log(result);
        }).catch(err=>console.log(err));
          
      }
      callback(null,true)//res.send(true);
    })
  }

  exports.handle_request = handle_request;