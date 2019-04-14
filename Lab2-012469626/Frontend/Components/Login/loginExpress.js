var express = require('express');

var app = express();

var cors = require('cors');

var md5= require('md5');

var mongoose=require('mongoose');


///////JWT PASSPORT///////////
var passport = require('passport');
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
///////JWT PASSPORT///////////


const logindata=require('../../../models/loginData');

const coursedetails=require('../../../models/courseDetails');

const announcements =require('../../../models/announcement');

const assignment=require('../../../models/assignment');

const quiz1=require('../../../models/quiz');

const enrolled1=require('../../../models/enrolled');

const codes=require('ip../../../models/codes');

const uploadfile=require('../../../models/uploadfile');

const uploadAssignment=require('../../../models/assignmentgrade');

const message123=require('../../../models/message');


////////////////////ROUTES IMPORT ///////////////////////////////////////
var login=require('../../../server/login');
var createcourse=require('../../../server/createcourse');
var getCourses=require('../../../server/getCourses');
var viewStudents=require('../../../server/viewStudents');
var viewPeople=require('../../../server/viewPeople');
var sendMessage=require('../../../server/sendMessage');
var viewMarks=require('../../../server/viewMarks');
var GeneratePermissionCode=require('../../../server/GeneratePermissionCode');
var assignmentView=require('../../../server/assignmentView');
var sendMessage123=require('../../../server/sendMessage123');
var search=require('../../../server/search');
var recieveMessage=require('../../../server/recieveMessage');
var assignmentMarks=require('../../../server/assignmentMarks');
var ViewLecture=require('../../../server/ViewLecture');
var ViewAssignmentSubmission=require('../../../server/ViewAssignmentSubmission');
var courseAnnouncement=require('../../../server/courseAnnouncement');
var studentAssignment=require('../../../server/studentAssignment');
var quiz=require('../../../server/quiz');
var getCoursesStudent=require('../../../server/getCoursesStudent');
var enrollCourse=require('../../../server/enrollCourse');
var displayCodes=require('../../../server/displayCodes');
var generateCode=require('../../../server/generateCode');
var dropStudent=require('../../../server/dropStudent');
var codematch=require('../../../server/codematch');
var signup=require('../../../server/signup');
var facultyCreateAssignment=require('../../../server/facultyCreateAssignment');
var announcement=require('../../../server/announcement');
var facultyCreateQuiz=require('../../../server/facultyCreateQuiz');
var enrolled=require('../../../server/enrolled');
var waitlist=require('../../../server/waitlist');
var dropCourse=require('../../../server/dropCourse');
var updateprofile=require('../../../server/updateprofile');
var getProfile=require('../../../server/getProfile');
////////////////////ROUTES IMPORT ///////////////////////////////////////


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

//MONGODB CONNECT STRING
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');


//MONGDB CONNECTION STRING END
app.use('/login',login);
app.use('/createcourse',createcourse);
app.use('/getCourses',getCourses);
app.use('/viewStudents',viewStudents);
app.use('/viewPeople',viewPeople);
app.use('/sendMessage',sendMessage);
app.use('/viewMarks',viewMarks);
app.use('/GeneratePermissionCode',GeneratePermissionCode);
app.use('/assignmentView',assignmentView);
app.use('/sendMessage123',sendMessage123);
app.use('/coursedetails',coursedetails);
app.use('/recieveMessage',recieveMessage);
app.use('/assignmentMarks',assignmentMarks);
app.use('/ViewLecture',ViewLecture);
app.use('/ViewAssignmentSubmission',ViewAssignmentSubmission);
app.use('/courseAnnouncement',courseAnnouncement);
app.use('/studentAssignment',studentAssignment);
app.use('/quiz',quiz);
app.use('/getCoursesStudent',getCoursesStudent);
app.use('/enrollCourse',enrollCourse);
app.use('/displayCodes',displayCodes);
app.use('/generateCode',generateCode);
app.use('/dropStudent',dropStudent);
app.use('/codematch',codematch);
app.use('/signup',signup);
app.use('/facultyCreateAssignment',facultyCreateAssignment);
app.use('/announcement',announcement);
app.use('/facultyCreateQuiz',facultyCreateQuiz);
app.use('/enrolled',enrolled);
app.use('/waitlist',waitlist);
app.use('/dropCourse',dropCourse);
app.use('/updateprofile',updateprofile);
app.use('/getProfile',getProfile);

app.get('/', (req, res) => {
    res.send("Hello");

});

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'Secret';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
        console.log('Payload Received', jwt_payload);
        if(jwt_payload){
            next(null, jwt_payload);
        }
        else{
            next(null, false);
        }
});
passport.use(strategy);
app.use(passport.initialize());

// app.post('/login',function(req,res){
//   var x=req.body.id;
//   var y=req.body.pwd;
//   y=md5(y);
//   var z=req.body.login;
//   var flag = '';
//   var query={username:x,password:y};
//   logindata.find(query).exec().then(result=>{
//     console.log(result);
//     res.json(result);
//   })
//   // var query="SELECT EMAIL, PASSWORD,role FROM logindata WHERE email='"+x+"' and password='"+y+"'";
//   // connection.query(query,function(err,result)
//   //   {
//   //       if(result)
//   //       {
//   //         flag = result[0];
//   //         console.log(flag);
//   //         console.log("Inside result");
          
//   //         abc();
//   //         // res.send(true);

//   //       }
//   //       else{
//   //         console.log("error");
//   //       }
//   //   });
//   //   function abc(){
//   //     res.send(flag);
//   //   }
    
    
//   })

  // app.post('/createcourse',function(req,res){
  //           var courseid=req.body.courseid;
  //           var coursename=req.body.coursename;
  //           var coursedept=req.body.coursedept;
  //           var coursedes=req.body.coursedes;
  //           var courseroom=req.body.courseroom;
  //           var coursecapacity=req.body.coursecapacity;
  //           var waitlistcapacity=req.body.waitlistcapacity;
  //           var courseteam=req.body.courseteam;
  //           var email=req.body.email;
  //           const entry = new coursedetails({
  //             _id: new mongoose.Types.ObjectId(),
  //             courseid: req.body.courseid,
  //             coursename: req.body.coursename,
  //             coursedept: req.body.coursedept,
  //             coursedes: req.body.coursedes,
  //             courseroom: req.body.courseroom,
  //             coursecapacity: req.body.coursecapacity,
  //             waitlistcapacity: req.body.waitlistcapacity,
  //             courseteam: req.body.courseteam,
  //             email: req.body.email
  //           })
    
  //           console.log('Data Entered in Course Details');
  //           entry.save().then(result=>{
  //             console.log(res);
  //             res.send(true);
  //           }).catch(err=>console.log(err));
  //         res.send(true);
          
  //         });
      
    // var query="INSERT INTO COURSEDETAILS(COURSEID,COURSENAME,COURSEDEPT,COURSEDES,COURSEROOM,COURSECAPACITY,WAITLISTCAPACITY,COURSETEAM,EMAIL) VALUES ('"+courseid+"','"+coursename+"','"+coursedept+"','"+coursedes+"','"+courseroom+"','"+coursecapacity+"','"+waitlistcapacity+"','"+courseteam+"','"+email+"')";
    // connection.query(query,function(err,result)
    // {
    //   if(err) 
    //   throw err;
    //   else
    //   res.redirect('/createcourse'); ///change value after creating view
      
    // });
  

// app.get('/getCourses',function(req,res){
//   var email=req.query.email;
//   console.log('Email in Faculty View Courses', email);
//   var query={email:email};
//   coursedetails.find(query).exec().then(result=>{
//     console.log("In Faculty Cards",result);
//     res.json(result);
//   })
// });
  // var query="SELECT COURSEID, COURSENAME FROM COURSEDETAILS WHERE EMAIL='"+email+"'";
  
//   connection.query(query,(err,result)=>{
//       if( err) throw err;

//         console.log(result);
//         res.json(result);
//   });
// })

// app.get('/viewStudents',function(req,res){
//   var courseid=req.query.courseid;
//   var query={courseid:courseid};
//   enrolled.find(query).exec().then(result=>{
//     console.log("In View Students",result,courseid);
//     res.json(result);
//   })
// });
//   console.log('CourseId',courseid);
//   var query="SELECT EMAIL, COURSEID, COURSENAME, STATUS FROM ENROLLED WHERE COURSEID='"+courseid+"' AND STATUS='"+x+"'" ; 
//    connection.query(query,(err,result)=>{
//     if( err) throw err;
//       console.log("INSIDE VIEW STUDENTS",result);
//       res.json(result);
// });
// })

// app.get('/viewPeople',function(req,res){
//   var courseid=req.query.courseid;
//   console.log('CourseId',courseid);
//   var query={courseid:courseid};
//   enrolled.find(query).exec().then(result=>{
//     console.log("In View Collegues",result,courseid);
//     res.json(result);
//   })
// });

// app.post('/sendMessage',function(req,res){
//   var email=req.body.email;
//   var role= req.body.role;
//   var message=req.body.message;
//   var senderemail=req.body.senderemail;
//   const entry = new message123({
//     _id: new mongoose.Types.ObjectId(),
//     senderemail:email,
//     recieveremail: senderemail,
//     message: message,
    
//   })

//   console.log('Data Entered in Message');
//   entry.save().then(result=>{
//     console.log(res);
//     res.send(true);
//   }).catch(err=>console.log(err));
// })

// });
//   var query="SELECT EMAIL, COURSEID, COURSENAME, STATUS FROM ENROLLED WHERE COURSEID='"+courseid+"'"; 
//    connection.query(query,(err,result)=>{
//     if( err) throw err;
//       console.log("INSIDE VIEW PEOPLE",result);
//       res.json(result);
// });
// })

// app.get('/viewMarks',function(req,res){
//   var email=req.query.email;
//   var query={email:email};
//   uploadAssignment.find(query).exec().then(result=>{
//     console.log("In View Grades",result);
//     res.json(result);
//   })
// });
//   var query="SELECT  COURSEID,EMAIL,ASSIGNMENTLOCATION,GRADE FROM ASSIGNMENTGRADE WHERE EMAIL='"+email+"'"; 
//    connection.query(query,(err,result)=>{
//     if( err) throw err;
//       console.log("INSIDE VIEW STUDENT GRADES",result);
//       res.json(result);
// });
// })

// app.get('/GeneratePermissionCode',function(req,res){
//   var courseid=req.query.courseid;
//   var x="W"
//   console.log('CourseId',courseid);
//   var query={courseid:courseid,status:x};
//   enrolled.find(query).exec().then(result=>{
//     console.log("In Grant Codes",result);
//     res.json(result);
//   })
// });
//   var query="SELECT EMAIL, COURSEID, COURSENAME, STATUS FROM ENROLLED WHERE COURSEID='"+courseid+"'AND STATUS='"+x+"'"; 
//    connection.query(query,(err,result)=>{
//     if( err) throw err;
//       console.log("INSIDE VIEW STUDENTS",result);
//       res.json(result);
// });
// })
// app.get('/uploadView',function(req,res){
//   var courseid=req.query.courseid;
//   console.log('CourseId in upload view',courseid);
//   var query={courseid:courseid};
//   uploadfile.find(query).exec().then(result=>{
//     console.log("In Upload View",result);
//     res.json(result);
//   })
// });
//   var query="SELECT COURSEID, FILELOCATION, FILENAME FROM UPLOADFILE WHERE COURSEID='"+courseid+"'"; 
//   connection.query(query,(err,result)=>{
//   if(err) throw err;
//   res.json(result);
// });
// })

// app.get('/assignmentView',function(req,res){
//   var courseid=req.query.courseid;
//   var email=req.query.email;
//   console.log('CourseId in Assignment view',courseid,email);
//   var query={courseid:courseid,email:email};
//   uploadAssignment.find(query).exec().then(result=>{
//     console.log("In Upload Assignment View",result);
//     res.json(result);
//   })
// });

// app.get('/sendMessage123',function(req,res){
//   logindata.find().exec().then(result=>{
//     console.log("In Message View",result);
//     res.json(result);
//   })
// });

// app.get('/search',function(req,res){
//   var search=req.query.search;
//   var query={courseid:search};
//   coursedetails.find(query).exec().then(result=>{
//     console.log("In Search View",result);
//     res.json(result);
//   })
// });

// app.get('/recieveMessage',function(req,res){
//   var email=req.query.email;
//   var query={recieveremail:email};
//   message123.find(query).exec().then(result=>{
//     console.log("In Recieve Message View",result);
//     res.json(result);
//   })
// });
//   var query="SELECT COURSEID, EMAIL, ASSIGNMENTLOCATION FROM ASSIGNMENTGRADE WHERE COURSEID='"+courseid+"' AND EMAIL='"+email+"'"; 
//   connection.query(query,(err,result)=>{
//   if(err) throw err;
//   res.json(result);
// });
// })

// app.post('/assignmentMarks',function(req,res){
//   var marks= req.body.marks;
//   var courseid=req.body.courseid;
//   var query={$set: {assignmentgrade:marks}};
//   uploadAssignment.update({courseid:courseid},query).exec().then(result=>{
//     console.log(result);
//     res.send(true);
//   }).catch(err=>console.log(err));
    
//   })
//   var query="UPDATE assignmentgrade SET GRADE='"+marks+"' where courseid='"+courseid+"'";
//   connection.query(query,function(err,result)
//   {
//     if(err) 
//     throw err;
//     res.send(true);
//   });
// });

// app.post('/quizCalculated', function(req,res){
//   var option=req.body.option;
//   var email=req.body.email;
//   var courseid=req.body.courseid;
//   var query="INSERT INTO quizanswer (EMAIL,COURSEID,OPTIONS) VALUES ('"+email+"','"+courseid+"','"+option+"')";
//   connection.query(query,function(err,result)
//   {
//     if(err) 
//     throw err;
//     res.send(true);
//   });
// });

// app.get('/ViewLecture',function(req,res){
//   var courseid=req.query.courseid;
//   console.log('CourseId in Lecture view',courseid);
//   var query={courseid:courseid};
//   uploadfile.find(query).exec().then(result=>{
//     console.log("In Lecture View",result);
//     res.json(result);
//   })
// });
//   var query="SELECT COURSEID, FILELOCATION, FILENAME FROM UPLOADFILE WHERE COURSEID='"+courseid+"'"; 
//   connection.query(query,(err,result)=>{
//   if(err) throw err;
//   res.json(result);
// });
// })
// app.get('/ViewAssignmentSubmission',function(req,res){
//   var courseid=req.query.courseid;
//   console.log('CourseId in Submit Assignment view',courseid);
//   var query={courseid:courseid};
//   uploadAssignment.find(query).exec().then(result=>{
//     console.log("In Upload Assignment View",result);
//     res.json(result);
//   })
// });
//   var query="SELECT COURSEID, EMAIL,ASSIGNMENTLOCATION FROM assignmentgrade WHERE COURSEID='"+courseid+"'"; 
//   connection.query(query,(err,result)=>{
//   if(err) throw err;
//   res.json(result);
// });
// })

// app.get('/courseAnnouncement',function(req,res){
//   var courseid=req.query.courseid;
//   console.log('CourseId',courseid);
//   var query={courseid:courseid};
//   announcements.find(query).exec().then(result=>{
//     console.log("In Student View Announcements",result);
//     res.json(result);
//   })
// });
//   var query="SELECT HEADING,TEXT ,COURSEID FROM FACULTYANNOUNCEMENTS WHERE COURSEID='"+courseid+"'"; 
//    connection.query(query,(err,result)=>{
//     if( err) throw err;
//       console.log("INSIDE VIEW STUDENTS ANNOUNCEMENTS",result);
//       res.json(result);
// });
// })


// app.get('/studentAssignment',function(req,res){
//   var courseid=req.query.courseid;
//   console.log('CourseId',courseid);
//   var query={courseid:courseid};
//   assignment.find(query).exec().then(result=>{
//     console.log("In Student View Assignment",result);
//     res.json(result);
//   })
// });
//   var query="SELECT COURSEID, ASSIGNMENTHEADING, ASSIGNMENTTEXT FROM FACULTYCREATEASSIGNMENT WHERE COURSEID='"+courseid+"'"; 
//    connection.query(query,(err,result)=>{
//     if( err) throw err;
//       console.log("INSIDE VIEW STUDENTS Assignment",result);
//       res.json(result);
// });
// })

// app.get('/quiz',function(req,res){
//   var courseid=req.query.courseid;
//   console.log('CourseId IN QUIZ',courseid);
//   var query={courseid:courseid};
//   quiz.find(query).exec().then(result=>{
//     console.log("Inside View Quiz",result);
//     res.json(result);
//   })
// });
//   var query="SELECT COURSEID, EMAIL, QUES, OPTION1, OPTION2, OPTION3, OPTION4 FROM QUIZ WHERE COURSEID='"+courseid+"'"; 
//    connection.query(query,(err,result)=>{
//     if( err) throw err;
//       console.log("INSIDE QUIZ",result);
//      res.json(result);
//     });
      

// })

// app.get('/getCoursesStudent',function(req,res){
//   var email=req.query.email;
//   var x="E";
//   var query={email:email,status:x};
//   enrolled.find(query).exec().then(result=>{
//     console.log("In Student View Courses",result);
//     res.json(result);
//   })
// });
//   var query="SELECT COURSEID, COURSENAME FROM ENROLLED WHERE EMAIL='"+email+"'";
//   connection.query(query,(err,result)=>{
//       if( err) throw err;

//         console.log(result);
//         res.json(result);
//   });
// })

// app.get('/enrollCourse',function(req,res){
  
//   coursedetails.find().exec().then(result=>{
//     console.log("In Enroll Course Dashboard",result);
//     res.json(result);
//   })
// });
  
//   var query="SELECT COURSEID, COURSENAME, COURSECAPACITY, WAITLISTCAPACITY FROM COURSEDETAILS"; 
//   var resp;
//   connection.query(query,(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     resp = result;
//     abc();
//   });
//   function abc(){
//     res.json(resp);
//   }
// })

// app.get('/displayCodes',function(req,res){
//   codes.find().exec().then(result=>{
//     console.log("In Code Data Table",result);
//     res.json(result);
//   })
// });
//   var query="SELECT EMAIL, COURSEID, CODE FROM CODES";
//   connection.query(query,(err,result)=>{
//       if( err) throw err;
//         console.log(result);
//         res.json(result);
//   });
// })

// app.post('/generateCode',function(req,res){
//   const {email}=req.body;
//   const {courseid}=req.body;

//   var code=parseInt(Math.random()*(9999-1000)+1000);
//   const entry = new codes({
//     _id: new mongoose.Types.ObjectId(),
//     email:email,
//     courseid: courseid,
//     codes:code
//   })

//   console.log('Data Entered in Codes');
//   entry.save().then(result=>{
//     console.log(res);
//     res.send(true);
//   }).catch(err=>console.log(err));
// });
//   var query="INSERT INTO CODES(EMAIL,COURSEID,CODE) VALUES('"+email+"','"+courseid+"','"+code+"')";
//   connection.query(query,(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     res.send(true);
//   })
// })

// app.post('/dropStudent',function(req,res){
//   const {email}=req.body;
//   const {courseid}=req.body;
//   var query={email:email, courseid:courseid};
//   enrolled.remove(query).exec().then(result=>{
//   console.log(result);
//   res.send(true);
//   }).catch(err=>console.log(err));
// })

// app.post('/sendMessage',function(req,res){
//   const {email}=req.body;
//   const
// })
//   var query="DELETE FROM  ENROLLED WHERE EMAIL='"+email+"'";
//   connection.query(query,(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     res.send(true);
//   })
// })

// app.post('/codematch',function(req,res){
//   var code=req.body.EnterCode;
//   var email=req.body.email;
//   var courseid=req.body.courseid;
//   var z="E";
//   var query={email:email};
//   codes.find(query).exec().then(result=>{
//     console.log("In Code Match",result[0].codes);
//     if(result[0].codes===code)
//     {
//       var query2={$set: {status:z}};
//       enrolled.update({email:email,courseid:courseid},query2).exec().then(result=>{
//         console.log(result);
//       }).catch(err=>console.log(err));
        
//     }
//     res.send('true');
//   })
// })
//   var query="SELECT CODE FROM CODES WHERE EMAIL='"+email+"'";
//   connection.query(query,(err,result)=>{
//     if(result[0].CODE === code)
//   {
//     var query2="UPDATE ENROLLED SET STATUS='"+z+"' WHERE COURSEID='"+courseid+"' AND EMAIL='"+email+"'";
//     connection.query(query2,(err,result)=>{
//       if(err) throw err;
//       console.log("Inside EnrolledX",email,courseid);
//       res.send(true);
//     })

//   }
//   })
  
//   res.send('true');
// })

// app.post('/signup',function(req,res){
//   var name= req.body.Name;
//   var email=req.body.Email;
//   var password=req.body.Password;
//   password = md5(password);
//   var role=req.body.Role;
//   const entry = new logindata({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.Name,
//     username: req.body.Email,
//     password: md5(req.body.Password),
//     role: req.body.Role,
//     phoneno: '',
//     address: '',
//     aboutme: '',
//     city:'' ,
//     country:'',
//     company:'',
//     school: '',
//     hometown:'',
//     gender:'',
//     languages:'',
//     picture:''
//   })
//   console.log('Entered');
//   entry.save().then(result=>{
//     console.log(res);
//     res.send(true);
//   }).catch(err=>console.log(err));
// res.send(true);
// });
//   var query="INSERT INTO logindata(NAME,EMAIL,PASSWORD,role) VALUES ('"+name+"','"+email+"','"+password+"','"+role+"')";
//   connection.query(query,function(err,result)
//   {
//     if(err) 
//     throw err;
//     //else
//     //res.redirect('/login');
    
//   });

// res.send('true');
// });

// app.post('/facultyCreateAssignment',function(req,res){
//   var assignmentHeading=req.body.assignmentHeading;
//   var assignmentText=req.body.assignmentText;
//   var email=req.body.email;
//   var courseid=req.body.courseid;
//   const entry = new assignment({
//     _id: new mongoose.Types.ObjectId(),
//     courseid: req.body.courseid,
//     email:req.body.email,
//     heading: req.body.assignmentHeading,
//     text: req.body.assignmentText,
    
    
//   })

//   console.log('Data Entered in Assignements');
//   entry.save().then(result=>{
//     console.log(res);
//     res.send(true);
//   }).catch(err=>console.log(err));
// res.send(true);

// });
  
//   var query="INSERT INTO FACULTYCREATEASSIGNMENT(COURSEID,EMAIL,ASSIGNMENTHEADING ,ASSIGNMENTTEXT ) VALUES ('"+courseid+"','"+email+"','"+assignmentHeading+"','"+assignmentText+"')";
//   connection.query(query,function(err,result)
//   {
//     if(err) 
//     throw err;
//     else
//     res.redirect('/login');
    
//   });
// res.send('true');
// });

// app.post('/announcement',function(req,res){
//   var courseid=req.body.courseid;
//   var announcementHeading= req.body.announcementHeading;
//   var announcementText=req.body.announcementText;
//   const entry = new announcements({
//     _id: new mongoose.Types.ObjectId(),
//     heading: req.body.announcementHeading,
//     text: req.body.announcementText,
//     courseid: req.body.courseid,
    
//   })

//   console.log('Data Entered in Announcements');
//   entry.save().then(result=>{
//     console.log(res);
//     res.send(true);
//   }).catch(err=>console.log(err));
// res.send(true);

// });
//   var query="INSERT INTO FACULTYANNOUNCEMENTS(HEADING,TEXT,COURSEID) VALUES ('"+announcementHeading+"','"+announcementText+"','"+courseid+"')";
//   connection.query(query,function(err,result)
//   {
//     if(err) 
//     throw err;
    
//   });
// res.send('true');
// });

// app.post('/facultyCreateQuiz',function(req,res){
//   var courseid=req.body.courseid;
//   var ques=req.body.ques;
//   var op1=req.body.op1;
//   var op2=req.body.op2;
//   var op3=req.body.op3;
//   var op4=req.body.op4;
//   var result=req.body.result;
//   const entry = new quiz({
//     _id: new mongoose.Types.ObjectId(),
//     courseid: req.body.courseid,
//     ques:req.body.ques,
//     option1: req.body.op1,
//     option2: req.body.op2,
//     option3: req.body.op3,
//     option4: req.body.op4,
//     result:req.body.result
    
//   })

//   console.log('Data Entered in Quiz Creation');
//   entry.save().then(result=>{
//     console.log(res);
//     res.send(true);
//   }).catch(err=>console.log(err));
// res.send(true);

// });
//   var query="INSERT INTO QUIZ(COURSEID,QUES,OPTION1,OPTION2,OPTION3,OPTION4,result) VALUES ('"+courseid+"','"+ques+"','"+op1+"','"+op2+"','"+op3+"','"+op4+"','"+result+"')";
//   connection.query(query,function(err,result)
//   {
//     if(err) 
//     throw err;
    
//   });
// res.send('true');
// });

// app.post('/enrolled',function(req,res){
//   var courseid=req.body.courseid;
//   var coursename=req.body.coursename;
//   var email=req.body.email;
//   var status=req.body.enroll;
//   console.log('Coursename', coursename, courseid, email, status);

//   const entry = new enrolled({
//     _id: new mongoose.Types.ObjectId(),
//     email:req.body.email,
//     courseid: req.body.courseid,
//     status:req.body.enroll,
//     coursename:req.body.coursename
//     })
//       console.log('Course Enrolled');
//       entry.save().then(result=>{
//       console.log(result);
//       // res.send(true);
//       abc();
//       }).catch(err=>console.log(err));
    
//       function abc(){
//         var query={$inc: {coursecapacity:-1}};
//         coursedetails.update({courseid: req.body.courseid},query).exec().then(result=>{
//           console.log("Inside Enroll Course Decrement",result);
//           res.send(true);
//         }).catch(err=>console.log(err));
//       }
//     });
          
      
  // var query="INSERT INTO ENROLLED(EMAIL,COURSEID,STATUS,COURSENAME) VALUES ('"+email+"','"+courseid+"','"+status+"','"+coursename+"')";
  // connection.query(query,function(err,result){
  //   if(err)
  //   throw err;
  //   console.log(result);
  //   abc();
  // });
//   function abc(){
//     var query2="UPDATE COURSEDETAILS SET COURSECAPACITY = COURSECAPACITY-1 WHERE COURSEID='"+courseid+"'";
//     connection.query(query2,function(err,result){
//       if(err)
//       throw err;
//       console.log('RESULT ', result);
//   }
//     )}
//   res.send('true');
// });

// app.post('/waitlist',function(req,res){
//   var courseid=req.body.courseid;
//   var coursename=req.body.coursename;
//   var email=req.body.email;
//   var status=req.body.waitlist;
//   const entry = new enrolled({
//     _id: new mongoose.Types.ObjectId(),
//     email:req.body.email,
//     courseid: req.body.courseid,
//     status:req.body.waitlist,
//     coursename:req.body.coursename
//     })
//       console.log('Course Waitlist');
//       entry.save().then(result=>{
//       console.log(result);
//       // res.send(true);
//       abc();
//       }).catch(err=>console.log(err));
    
//       function abc(){
//         var query={$inc: {waitlistcapacity:-1}};
//         coursedetails.update({courseid: req.body.courseid},query).exec().then(result=>{
//           console.log("Inside Enroll Course Decrement",result);
//           res.send(true);
//         }).catch(err=>console.log(err));
//       }
//     });
//   var query="INSERT INTO ENROLLED(EMAIL,COURSEID,STATUS,COURSENAME) VALUES ('"+email+"','"+courseid+"','"+status+"','"+coursename+"')";
//   connection.query(query,function(err,result){
//     if(err)
//     throw err;
//     console.log(result);
//     abc();
//   });
//   function abc(){
//     var query2="UPDATE COURSEDETAILS SET WAITLISTCAPACITY = WAITLISTCAPACITY-1 WHERE COURSEID='"+courseid+"'";
//     connection.query(query2,function(err,result){
//       if(err)
//       throw err;
//       console.log('RESULT ', result);
//   }
//     )}
//   res.send('true');
// });

// app.post('/dropCourse',function(req,res){
//   var email=req.body.email;
//   var courseid=req.body.courseid;
//       console.log('Course Dropped',email,courseid);
//       var query={email:email, courseid:courseid};
//       enrolled.remove(query).exec().then(result=>{
//       console.log(result);
//       // res.send(true);
//       abc();
//       }).catch(err=>console.log(err));
    
//       function abc(){
//         var query={$inc:{coursecapacity:1}};
//         coursedetails.update({courseid: req.body.courseid},query).exec().then(result=>{
//           console.log("Inside Drop Course Increment",result);
//           res.send(true);
//         }).catch(err=>console.log(err));
//       }
//     });
//   var query="DELETE FROM ENROLLED WHERE EMAIL='"+email+"' AND COURSEID='"+courseid+"'";
//   connection.query(query,function(err,result){
//     if(err)
//     throw err;
//     console.log(result);
//     abc();
//   });
//   function abc(){
//     var query2="UPDATE COURSEDETAILS SET COURSECAPACITY = COURSECAPACITY+1 WHERE COURSEID='"+courseid+"'";
//     connection.query(query2,function(err,result){
//       if(err)
//       throw err;
//       console.log('RESULT  DROP', result);
//   }
//     )}
//   res.send('true');
// });

app.post('/upload',function (req, res){
  let uploadFile = req.files.file
  const filename = req.files.file.name
  var email=req.body.email;
  var courseid=req.body.courseid;

  console.log(uploadFile);
  console.log(filename);
  uploadFile.mv('C:/ReactUpload/'+`${filename}`);
  
  var location= "http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:8080/"+`${filename}`;
  var name=`${filename}`;
  const entry = new uploadfile({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    courseid: req.body.courseid,
    filelocation:location,
    filename:name
  })

  console.log('Data Entered in UploadFile');
  entry.save().then(result=>{
    console.log(res);
    res.send(true);
  }).catch(err=>console.log(err));
res.send(true);

});
//   var query3="INSERT INTO UPLOADFILE(EMAIL,COURSEID,FILELOCATION,FILENAME) VALUES('"+email+"','"+courseid+"','"+location+"','"+name+"')";
//   connection.query(query3,function(err,result){
//     if(err)
//     throw err;
//     console.log('FILE  UPLOAD', result);
//     res.send(true);
//   })
// });

app.post('/uploadPicture',function (req, res){
  let uploadFile = req.files.file
  const filename = req.files.file.name
  var email=req.body.email;
  console.log(uploadFile);
  console.log(filename);
  uploadFile.mv('C:/ReactUpload/'+`${filename}`);

  var location= "http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:8080/"+`${filename}`;
  var name=`${filename}`;
  var query={$set: {picture:location}};
  logindata.update({username:email},query).exec().then(result=>{
    console.log(result);
    res.send(true);
  }).catch(err=>console.log(err));
    
  })
//   var query3="UPDATE LOGINDATA SET picture='"+location+"' WHERE EMAIL='"+email+"'";
//   connection.query(query3,function(err,result){
//     if(err)
//     throw err;
//     console.log('PICTURE UPLOADED ', result);
//     res.send(true);

//   })
// });

app.post('/uploadAssignment',function (req, res){
  let uploadFile = req.files.file
  const filename = req.files.file.name
  var courseid=req.body.courseid;
  var email=req.body.email;
  console.log(uploadFile);
  console.log(filename);
  uploadFile.mv('C:/ReactUpload/'+`${filename}`);

  var location= "http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:8080/"+`${filename}`;
  var name=`${filename}`;
  const entry = new uploadAssignment({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    courseid: req.body.courseid,
    assignmentlocation:location,
  })

  console.log('Data Entered in UploadAssignment');
  entry.save().then(result=>{
    console.log(res);
    res.send(true);
  }).catch(err=>console.log(err));
});
//   var query3="INSERT INTO ASSIGNMENTGRADE(COURSEID, EMAIL, ASSIGNMENTLOCATION) VALUES('"+courseid+"','"+email+"','"+location+"')";
//   connection.query(query3,function(err,result){
//     if(err)
//     throw err;
//     console.log('Assignment Uploaded ', result);
//     res.send(true);

//   })
// });

// app.post('/updateprofile',function(req,res){
//   var sid= req.body.sid;
//   var phoneno=req.body.phoneno;
//   var email=req.body.email;
//   var address=req.body.address;
//   var aboutme=req.body.aboutme;
//   var city=req.body.city;
//   var country=req.body.country;
//   var company=req.body.company;
//   var school=req.body.school;
//   var hometown=req.body.hometown;
//   var gender=req.body.gender;
//   var language=req.body.languages;
  
//   var query={$set: {sid:sid,phoneno:phoneno,address:address,aboutme:aboutme,city:city,country:country,company:company,school:school,hometown:hometown,gender:gender,languages:language}};
//   logindata.update({username:email},query).exec().then(result=>{
//     console.log(result);
//     res.send(true);
//   }).catch(err=>console.log(err));
    
//   })
//   var query="UPDATE LOGINDATA SET SID='"+sid+"',PHONENO='"+phoneno+"',ADDRESS='"+address+"',ABOUTME='"+aboutme+"',CITY='"+city+"',COUNTRY='"+country+"',COMPANY='"+company+"',SCHOOL='"+school+"',HOMETOWN='"+hometown+"',GENDER='"+gender+"',LANGUAGES='"+language+"' WHERE EMAIL='"+email+"'";
//   connection.query(query,function(err,result)
//   {
//     if(err) 
//     throw err;
    
//   });
// res.send('true');

// app.get('/getProfile',function(req,res){
//   var email=req.query.email;
//   console.log('Profile in  view',email);
//   var query={username:email};
//   logindata.find(query).exec().then(result=>{
//     console.log("In Update Profile Upload",result);
//     res.json(result);
//   })
// });
//   var query="SELECT EMAIL,SID,PHONENO,ADDRESS,CITY,COUNTRY,COMPANY,SCHOOL,HOMETOWN,GENDER,LANGUAGES,ABOUTME,picture FROM LOGINDATA WHERE EMAIL='"+email+"'"; 
//   connection.query(query,(err,result)=>{
//   if(err) throw err;
//   res.json(result);
// });
// })

app.listen(3001);
console.log("server running 3001");
module.exports = app;