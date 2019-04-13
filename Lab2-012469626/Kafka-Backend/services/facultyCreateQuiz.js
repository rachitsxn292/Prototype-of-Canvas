var express = require('express');

var router=express.Router();

const quiz=require('../../models/quiz');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
    var courseid=message.body.courseid;
    var ques=message.body.ques;
    var op1=message.body.op1;
    var op2=message.body.op2;
    var op3=message.body.op3;
    var op4=message.body.op4;
    var result=message.body.result;
    const entry = new quiz({
      _id: new mongoose.Types.ObjectId(),
      courseid: message.body.courseid,
      ques:message.body.ques,
      option1: message.body.op1,
      option2: message.body.op2,
      option3: message.body.op3,
      option4: message.body.op4,
      result:message.body.result
      
    })
  
    console.log('Data Entered in Quiz Creation');
    entry.save().then(result=>{
      console.log(res);
      callback(null,true);//res.send(true);
    }).catch(err=>console.log(err));
    callback(null,true); //res.send(true);
  
  };


  exports.handle_request = handle_request;