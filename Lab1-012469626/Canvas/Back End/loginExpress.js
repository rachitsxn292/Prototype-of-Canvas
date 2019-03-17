var express = require('express');

var app = express();

var cors = require('cors');

var md5= require('md5');

var session = require('express-session');

var bodyParser = require('body-parser');

app.use(bodyParser.json());

var expressFileUpload=require('express-fileupload');

app.use(expressFileUpload());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
  secret              : 'Canvas',
  resave              : false, 
  saveUninitialized   : false, 
  duration            : 60 * 60 * 1000,    
  activeDuration      :  5 * 60 * 1000
}));

//CONNECTION FOR SQL SERVER
var mysql = require('mysql')
var connection = mysql.createPool({
  connectionLimit: 152,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'canvas'
});
console.log("Connected to Sql");
//connection.connect()
//CONNECTION STATEMENT ENDS

app.get('/', (req, res) => {
    res.send("Hello");

});

app.post('/login',function(req,res){
  var x=req.body.id;
  var y=req.body.pwd;
  y=md5(y);
  var z=req.body.login;
  var flag = '';
  var query="SELECT EMAIL, PASSWORD,role FROM logindata WHERE email='"+x+"' and password='"+y+"'";
  connection.query(query,function(err,result)
    {
        if(result)
        {
          flag = result[0];
          console.log(flag);
          console.log("Inside result");
          
          abc();
          // res.send(true);

        }
        else{
          console.log("error");
        }
    });
    function abc(){
      res.send(flag);
    }
    
    
  })

  app.post('/createcourse',function(req,res){
            var courseid=req.body.courseid;
            var coursename=req.body.coursename;
            var coursedept=req.body.coursedept;
            var coursedes=req.body.coursedes;
            var courseroom=req.body.courseroom;
            var coursecapacity=req.body.coursecapacity;
            var waitlistcapacity=req.body.waitlistcapacity;
            var courseteam=req.body.courseteam;
            var email=req.body.email;
    var query="INSERT INTO COURSEDETAILS(COURSEID,COURSENAME,COURSEDEPT,COURSEDES,COURSEROOM,COURSECAPACITY,WAITLISTCAPACITY,COURSETEAM,EMAIL) VALUES ('"+courseid+"','"+coursename+"','"+coursedept+"','"+coursedes+"','"+courseroom+"','"+coursecapacity+"','"+waitlistcapacity+"','"+courseteam+"','"+email+"')";
    connection.query(query,function(err,result)
    {
      if(err) 
      throw err;
      else
      res.redirect('/createcourse'); ///change value after creating view
      
    });
  
res.send('true');
});

app.get('/getCourses',function(req,res){
  var email=req.query.email;
  console.log('Email', email);
  var query="SELECT COURSEID, COURSENAME FROM COURSEDETAILS WHERE EMAIL='"+email+"'";
  connection.query(query,(err,result)=>{
      if( err) throw err;

        console.log(result);
        res.json(result);
  });
})

app.get('/viewStudents',function(req,res){
  var courseid=req.query.courseid;
  var x="E";
  console.log('CourseId',courseid);
  var query="SELECT EMAIL, COURSEID, COURSENAME, STATUS FROM ENROLLED WHERE COURSEID='"+courseid+"' AND STATUS='"+x+"'" ; 
   connection.query(query,(err,result)=>{
    if( err) throw err;
      console.log("INSIDE VIEW STUDENTS",result);
      res.json(result);
});
})

app.get('/viewPeople',function(req,res){
  var courseid=req.query.courseid;
  console.log('CourseId',courseid);
  var query="SELECT EMAIL, COURSEID, COURSENAME, STATUS FROM ENROLLED WHERE COURSEID='"+courseid+"'"; 
   connection.query(query,(err,result)=>{
    if( err) throw err;
      console.log("INSIDE VIEW PEOPLE",result);
      res.json(result);
});
})

app.get('/viewMarks',function(req,res){
  var email=req.query.email;
  var query="SELECT  COURSEID,EMAIL,ASSIGNMENTLOCATION,GRADE FROM ASSIGNMENTGRADE WHERE EMAIL='"+email+"'"; 
   connection.query(query,(err,result)=>{
    if( err) throw err;
      console.log("INSIDE VIEW STUDENT GRADES",result);
      res.json(result);
});
})

app.get('/GeneratePermissionCode',function(req,res){
  var courseid=req.query.courseid;
  var x="W"
  console.log('CourseId',courseid);
  var query="SELECT EMAIL, COURSEID, COURSENAME, STATUS FROM ENROLLED WHERE COURSEID='"+courseid+"'AND STATUS='"+x+"'"; 
   connection.query(query,(err,result)=>{
    if( err) throw err;
      console.log("INSIDE VIEW STUDENTS",result);
      res.json(result);
});
})
app.get('/uploadView',function(req,res){
  var courseid=req.query.courseid;
  console.log('CourseId in upload view',courseid);
  var query="SELECT COURSEID, FILELOCATION, FILENAME FROM UPLOADFILE WHERE COURSEID='"+courseid+"'"; 
  connection.query(query,(err,result)=>{
  if(err) throw err;
  res.json(result);
});
})

app.get('/assignmentView',function(req,res){
  var courseid=req.query.courseid;
  var email=req.query.email;
  console.log('CourseId in Assignment view',courseid,email);
  var query="SELECT COURSEID, EMAIL, ASSIGNMENTLOCATION FROM ASSIGNMENTGRADE WHERE COURSEID='"+courseid+"' AND EMAIL='"+email+"'"; 
  connection.query(query,(err,result)=>{
  if(err) throw err;
  res.json(result);
});
})

app.post('/assignmentMarks',function(req,res){
  var marks= req.body.marks;
  var courseid=req.body.courseid;
  var query="UPDATE assignmentgrade SET GRADE='"+marks+"' where courseid='"+courseid+"'";
  connection.query(query,function(err,result)
  {
    if(err) 
    throw err;
    res.send(true);
  });
});

app.post('/quizCalculated', function(req,res){
  var option=req.body.option;
  var email=req.body.email;
  var courseid=req.body.courseid;
  var query="INSERT INTO quizanswer (EMAIL,COURSEID,OPTIONS) VALUES ('"+email+"','"+courseid+"','"+option+"')";
  connection.query(query,function(err,result)
  {
    if(err) 
    throw err;
    res.send(true);
  });
});

app.get('/ViewLecture',function(req,res){
  var courseid=req.query.courseid;
  console.log('CourseId in Lecture view',courseid);
  var query="SELECT COURSEID, FILELOCATION, FILENAME FROM UPLOADFILE WHERE COURSEID='"+courseid+"'"; 
  connection.query(query,(err,result)=>{
  if(err) throw err;
  res.json(result);
});
})
app.get('/ViewAssignmentSubmission',function(req,res){
  var courseid=req.query.courseid;
  console.log('CourseId in Submit Assignment view',courseid);
  var query="SELECT COURSEID, EMAIL,ASSIGNMENTLOCATION FROM assignmentgrade WHERE COURSEID='"+courseid+"'"; 
  connection.query(query,(err,result)=>{
  if(err) throw err;
  res.json(result);
});
})

app.get('/courseAnnouncement',function(req,res){
  var courseid=req.query.courseid;
  console.log('CourseId',courseid);
  var query="SELECT HEADING,TEXT ,COURSEID FROM FACULTYANNOUNCEMENTS WHERE COURSEID='"+courseid+"'"; 
   connection.query(query,(err,result)=>{
    if( err) throw err;
      console.log("INSIDE VIEW STUDENTS ANNOUNCEMENTS",result);
      res.json(result);
});
})


app.get('/studentAssignment',function(req,res){
  var courseid=req.query.courseid;
  console.log('CourseId',courseid);
  var query="SELECT COURSEID, ASSIGNMENTHEADING, ASSIGNMENTTEXT FROM FACULTYCREATEASSIGNMENT WHERE COURSEID='"+courseid+"'"; 
   connection.query(query,(err,result)=>{
    if( err) throw err;
      console.log("INSIDE VIEW STUDENTS Assignment",result);
      res.json(result);
});
})

app.get('/quiz',function(req,res){
  var courseid=req.query.courseid;
  console.log('CourseId IN QUIZ',courseid);
  var query="SELECT COURSEID, EMAIL, QUES, OPTION1, OPTION2, OPTION3, OPTION4 FROM QUIZ WHERE COURSEID='"+courseid+"'"; 
   connection.query(query,(err,result)=>{
    if( err) throw err;
      console.log("INSIDE QUIZ",result);
     res.json(result);
    });
      

})

app.get('/getCoursesStudent',function(req,res){
  var email=req.query.email;
  var query="SELECT COURSEID, COURSENAME FROM ENROLLED WHERE EMAIL='"+email+"'";
  connection.query(query,(err,result)=>{
      if( err) throw err;

        console.log(result);
        res.json(result);
  });
})

app.get('/enrollCourse',function(req,res){
  var query="SELECT COURSEID, COURSENAME, COURSECAPACITY, WAITLISTCAPACITY FROM COURSEDETAILS"; 
  var resp;
  connection.query(query,(err,result)=>{
    if(err) throw err;
    console.log(result);
    resp = result;
    abc();
  });
  function abc(){
    res.json(resp);
  }
})

app.get('/displayCodes',function(req,res){
  var query="SELECT EMAIL, COURSEID, CODE FROM CODES";
  connection.query(query,(err,result)=>{
      if( err) throw err;
        console.log(result);
        res.json(result);
  });
})

app.post('/generateCode',function(req,res){
  const {email}=req.body;
  const {courseid}=req.body;

  var code=parseInt(Math.random()*(9999-1000)+1000);
  var query="INSERT INTO CODES(EMAIL,COURSEID,CODE) VALUES('"+email+"','"+courseid+"','"+code+"')";
  connection.query(query,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(true);
  })
})

app.post('/dropStudent',function(req,res){
  const {email}=req.body;
  const {courseid}=req.body;
  var query="DELETE FROM  ENROLLED WHERE EMAIL='"+email+"'";
  connection.query(query,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(true);
  })
})

app.post('/codematch',function(req,res){
  var code=req.body.EnterCode;
  var email=req.body.email;
  var courseid=req.body.courseid;
  var z="E";
  var query="SELECT CODE FROM CODES WHERE EMAIL='"+email+"'";
  connection.query(query,(err,result)=>{
    if(result[0].CODE === code)
  {
    var query2="UPDATE ENROLLED SET STATUS='"+z+"' WHERE COURSEID='"+courseid+"' AND EMAIL='"+email+"'";
    connection.query(query2,(err,result)=>{
      if(err) throw err;
      console.log("Inside EnrolledX",email,courseid);
      res.send(true);
    })

  }
  })
  
  res.send('true');
})

app.post('/signup',function(req,res){
  var name= req.body.Name;
  var email=req.body.Email;
  var password=req.body.Password;
  password = md5(password);
  var role=req.body.Role;
  var query="INSERT INTO logindata(NAME,EMAIL,PASSWORD,role) VALUES ('"+name+"','"+email+"','"+password+"','"+role+"')";
  connection.query(query,function(err,result)
  {
    if(err) 
    throw err;
    else
    res.redirect('/login');
    
  });

res.send('true');
});

app.post('/facultyCreateAssignment',function(req,res){
  var assignmentHeading=req.body.assignmentHeading;
  var assignmentText=req.body.assignmentText;
  var email=req.body.email;
  var courseid=req.body.courseid;
  var query="INSERT INTO FACULTYCREATEASSIGNMENT(COURSEID,EMAIL,ASSIGNMENTHEADING ,ASSIGNMENTTEXT ) VALUES ('"+courseid+"','"+email+"','"+assignmentHeading+"','"+assignmentText+"')";
  connection.query(query,function(err,result)
  {
    if(err) 
    throw err;
    else
    res.redirect('/login');
    
  });
res.send('true');
});

app.post('/announcement',function(req,res){
  var courseid=req.body.courseid;
  var announcementHeading= req.body.announcementHeading;
  var announcementText=req.body.announcementText;
  var query="INSERT INTO FACULTYANNOUNCEMENTS(HEADING,TEXT,COURSEID) VALUES ('"+announcementHeading+"','"+announcementText+"','"+courseid+"')";
  connection.query(query,function(err,result)
  {
    if(err) 
    throw err;
    
  });
res.send('true');
});

app.post('/facultyCreateQuiz',function(req,res){
  var courseid=req.body.courseid;
  var ques=req.body.ques;
  var op1=req.body.op1;
  var op2=req.body.op2;
  var op3=req.body.op3;
  var op4=req.body.op4;
  var result=req.body.result;
  var query="INSERT INTO QUIZ(COURSEID,QUES,OPTION1,OPTION2,OPTION3,OPTION4,result) VALUES ('"+courseid+"','"+ques+"','"+op1+"','"+op2+"','"+op3+"','"+op4+"','"+result+"')";
  connection.query(query,function(err,result)
  {
    if(err) 
    throw err;
    
  });
res.send('true');
});

app.post('/enrolled',function(req,res){
  var courseid=req.body.courseid;
  var coursename=req.body.coursename;
  var email=req.body.email;
  var status=req.body.enroll;
  var query="INSERT INTO ENROLLED(EMAIL,COURSEID,STATUS,COURSENAME) VALUES ('"+email+"','"+courseid+"','"+status+"','"+coursename+"')";
  connection.query(query,function(err,result){
    if(err)
    throw err;
    console.log(result);
    abc();
  });
  function abc(){
    var query2="UPDATE COURSEDETAILS SET COURSECAPACITY = COURSECAPACITY-1 WHERE COURSEID='"+courseid+"'";
    connection.query(query2,function(err,result){
      if(err)
      throw err;
      console.log('RESULT ', result);
  }
    )}
  res.send('true');
});

app.post('/waitlist',function(req,res){
  var courseid=req.body.courseid;
  var coursename=req.body.coursename;
  var email=req.body.email;
  var status=req.body.waitlist;
  var query="INSERT INTO ENROLLED(EMAIL,COURSEID,STATUS,COURSENAME) VALUES ('"+email+"','"+courseid+"','"+status+"','"+coursename+"')";
  connection.query(query,function(err,result){
    if(err)
    throw err;
    console.log(result);
    abc();
  });
  function abc(){
    var query2="UPDATE COURSEDETAILS SET WAITLISTCAPACITY = WAITLISTCAPACITY-1 WHERE COURSEID='"+courseid+"'";
    connection.query(query2,function(err,result){
      if(err)
      throw err;
      console.log('RESULT ', result);
  }
    )}
  res.send('true');
});

app.post('/dropCourse',function(req,res){
  var email=req.body.email;
  var courseid=req.body.courseid;
  var query="DELETE FROM ENROLLED WHERE EMAIL='"+email+"' AND COURSEID='"+courseid+"'";
  connection.query(query,function(err,result){
    if(err)
    throw err;
    console.log(result);
    abc();
  });
  function abc(){
    var query2="UPDATE COURSEDETAILS SET COURSECAPACITY = COURSECAPACITY+1 WHERE COURSEID='"+courseid+"'";
    connection.query(query2,function(err,result){
      if(err)
      throw err;
      console.log('RESULT  DROP', result);
  }
    )}
  res.send('true');
});

app.post('/upload',function (req, res){
  let uploadFile = req.files.file
  const filename = req.files.file.name
  var email=req.body.email;
  var courseid=req.body.courseid;

  console.log(uploadFile);
  console.log(filename);
  uploadFile.mv('C:/ReactUpload/'+`${filename}`);
  
  var location= "http://localhost:8080/"+`${filename}`;
  var name=`${filename}`;
  var query3="INSERT INTO UPLOADFILE(EMAIL,COURSEID,FILELOCATION,FILENAME) VALUES('"+email+"','"+courseid+"','"+location+"','"+name+"')";
  connection.query(query3,function(err,result){
    if(err)
    throw err;
    console.log('FILE  UPLOAD', result);
    res.send(true);
  })
});

app.post('/uploadPicture',function (req, res){
  let uploadFile = req.files.file
  const filename = req.files.file.name
  var email=req.body.email;
  console.log(uploadFile);
  console.log(filename);
  uploadFile.mv('C:/ReactUpload/'+`${filename}`);

  var location= "http://localhost:8080/"+`${filename}`;
  var name=`${filename}`;
  var query3="UPDATE LOGINDATA SET picture='"+location+"' WHERE EMAIL='"+email+"'";
  connection.query(query3,function(err,result){
    if(err)
    throw err;
    console.log('PICTURE UPLOADED ', result);
    res.send(true);

  })
});

app.post('/uploadAssignment',function (req, res){
  let uploadFile = req.files.file
  const filename = req.files.file.name
  var courseid=req.body.courseid;
  var email=req.body.email;
  console.log(uploadFile);
  console.log(filename);
  uploadFile.mv('C:/ReactUpload/'+`${filename}`);

  var location= "http://localhost:8080/"+`${filename}`;
  var name=`${filename}`;
  var query3="INSERT INTO ASSIGNMENTGRADE(COURSEID, EMAIL, ASSIGNMENTLOCATION) VALUES('"+courseid+"','"+email+"','"+location+"')";
  connection.query(query3,function(err,result){
    if(err)
    throw err;
    console.log('Assignment Uploaded ', result);
    res.send(true);

  })
});
app.post('/updateprofile',function(req,res){
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

  var query="UPDATE LOGINDATA SET SID='"+sid+"',PHONENO='"+phoneno+"',ADDRESS='"+address+"',ABOUTME='"+aboutme+"',CITY='"+city+"',COUNTRY='"+country+"',COMPANY='"+company+"',SCHOOL='"+school+"',HOMETOWN='"+hometown+"',GENDER='"+gender+"',LANGUAGES='"+language+"' WHERE EMAIL='"+email+"'";
  connection.query(query,function(err,result)
  {
    if(err) 
    throw err;
    
  });
res.send('true');
});
app.get('/getProfile',function(req,res){
  var email=req.query.email;
  console.log('Profile in  view',email);
  var query="SELECT EMAIL,SID,PHONENO,ADDRESS,CITY,COUNTRY,COMPANY,SCHOOL,HOMETOWN,GENDER,LANGUAGES,ABOUTME,picture FROM LOGINDATA WHERE EMAIL='"+email+"'"; 
  connection.query(query,(err,result)=>{
  if(err) throw err;
  res.json(result);
});
})

app.listen(3001);
console.log("server running 3001");
module.exports = app;