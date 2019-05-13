var express = require('express');

var router=express.Router();

const logindata=require('../models/loginData');

var mongoose=require('mongoose');

router.post('/',function(req,res){
    var sid= req.body.sid;
    var phoneno=req.body.phoneno;
    var email=req.body.email;
    var address=req.body.address;
    var aboutme=req.body.aboutme;
    var city=req.body.city;
    var country=req.body.country;
    var company=req.body.company;
    var school=req.body.school;
    var hometown=req.body.hometown;
    var gender=req.body.gender;
    var language=req.body.languages;
    
    var query={$set: {sid:sid,phoneno:phoneno,address:address,aboutme:aboutme,city:city,country:country,company:company,school:school,hometown:hometown,gender:gender,languages:language}};
    logindata.update({username:email},query).exec().then(result=>{
      console.log(result);
      res.send(true);
    }).catch(err=>console.log(err));
      
    })
    module.exports=router;