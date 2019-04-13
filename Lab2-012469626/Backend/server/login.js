var express = require('express');

var router=express.Router();

var kafka = require('./kafka/client');

router.post('/', (req, res)=>{
  kafka.make_request('login', req, function(err, result){
    if(err){
        console.log(err);
    }
    else{
            console.log('MyResult', result);
            res.send(result);
    }
  });
})


module.exports=router;