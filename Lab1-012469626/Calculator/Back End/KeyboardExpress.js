var express = require('express');

var app = express();
var cors = require('cors');

var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());



app.get('/', (req, res) => {
    res.send("Hello");

});
app.post('/calculator',function(req,res){
    var x= parseFloat(req.body.in1);
    var y= parseFloat(req.body.in2);
    console.log(x);
    console.log(y);
    console.log(req.body.op)
    if(req.body.op=="Add")
    {
     
    var z= (x+y);
    z = z.toString();
    res.send(z);
    }
    else if(req.body.op=="Sub")
    {
        
    var z= (x-y);
    z = z.toString();
    res.send(z);
    }
    else if(req.body.op=="Div")
    {
    var z= (x/y);
    z = z.toString();
    res.send(z);
    }
    else if(req.body.op=="Mul")
    {
    var z= (x*y);
    z = z.toString();
    res.send(z);
    }
    else 
    console.log(z)
}

)

app.listen(3001);
console.log("server running 3001");