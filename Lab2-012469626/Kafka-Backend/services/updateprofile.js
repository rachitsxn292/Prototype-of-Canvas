var express = require('express');

var router=express.Router();

const logindata=require('../../models/loginData');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true',{poolSize:100});

function handle_request(message, callback){
    var sid= message.body.sid;
    var phoneno=message.body.phoneno;
    var email=message.body.email;
    var address=message.body.address;
    var aboutme=message.body.aboutme;
    var city=message.body.city;
    var country=message.body.country;
    var company=message.body.company;
    var school=message.body.school;
    var hometown=message.body.hometown;
    var gender=message.body.gender;
    var language=message.body.languages;
    
    var query={$set: {sid:sid,phoneno:phoneno,address:address,aboutme:aboutme,city:city,country:country,company:company,school:school,hometown:hometown,gender:gender,languages:language}};
    logindata.update({username:email},query).exec().then(result=>{
      console.log(result);
      callback(null,true)//res.send(true);
    }).catch(err=>console.log(err));
      
    }
    exports.handle_request = handle_request;