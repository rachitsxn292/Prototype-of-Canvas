var express = require('express');

var router=express.Router();

var md5= require('md5');

const logindata=require('../models/loginData');

router.post('/',function(req,res){
  var x=req.body.id;
  var y=req.body.pwd;
  y=md5(y);
  var z=req.body.login;
  var flag = '';
  var query={username:x,password:y};
  logindata.find(query).exec().then(result=>{
    console.log(result);
    res.json(result);
  })
  // var query="SELECT EMAIL, PASSWORD,role FROM logindata WHERE email='"+x+"' and password='"+y+"'";
  // connection.query(query,function(err,result)
  //   {
  //       if(result)
  //       {
  //         flag = result[0];
  //         console.log(flag);
  //         console.log("Inside result");
          
  //         abc();
  //         // res.send(true);

  //       }
  //       else{
  //         console.log("error");
  //       }
  //   });
  //   function abc(){
  //     res.send(flag);
  //   }
    
    
  })

  module.exports=router;