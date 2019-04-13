var express = require('express');

var router=express.Router();

const quiz=require('../../models/quiz');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var option=message.body.option;
    var email=message.body.email;
    var courseid=message.body.courseid;
    var query="INSERT INTO quizanswer (EMAIL,COURSEID,OPTIONS) VALUES ('"+email+"','"+courseid+"','"+option+"')";
    connection.query(query,function(err,result)
    {
      if(err) 
      throw err;
      callback(null,true)//res.send(true);
    });
  };

  exports.handle_request = handle_request;
  