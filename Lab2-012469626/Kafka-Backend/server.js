var connection = require('./kafka/connection');
var Login = require('./services/login');
var announcement=require('./services/announcement');
var assignmentMarks=require('./services/assignmentMarks');
var assignmentView=require('./services/assignmentView');
var codematch=require('./services/codematch');
var courseAnnouncement=require('./services/courseAnnouncement');
var createcourse=require('./services/createcourse');
var displayCodes=require('./services/displayCodes');
var dropCourse=require('./services/dropCourse');
var dropStudent=require('./services/dropStudent');
var enrollCourse=require('./services/enrollCourse');
var enrolled=require('./services/enrolled');
var facultyCreateAssignment=require('./services/facultyCreateAssignment');
var facultyCreateQuiz=require('./services/facultyCreateQuiz');
var generateCode=require('./services/generateCode');
var GeneratePermissionCode=require('./services/GeneratePermissionCode');
var getCourses=require('./services/getCourses');
var getCoursesStudent=require('./services/getCoursesStudent');
var getProfile=require('./services/getProfile');
var quiz=require('./services/quiz');
var quizCalculated=require('./services/quizCalculated');
var recieveMessage=require('./services/recieveMessage');
var search=require('./services/search');
var sendMessage=require('./services/sendMessage');
var sendMessage123=require('./services/sendMessage123');
var signup=require('./services/signup');
var studentAssignment=require('./services/studentAssignment');
var updateprofile=require('./services/updateprofile');
var uploadView=require('./services/uploadView');
var ViewAssignmentSubmission=require('./services/ViewAssignmentSubmission');
var ViewLecture=require('./services/ViewLecture');
var viewMarks=require('./services/viewMarks');
var viewPeople=require('./services/viewPeople');
var viewStudents=require('./services/viewStudents');
var waitlist=require('./services/waitlist');


function handleTopicRequest(topic_name, function_name){

    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();

    console.log('server is running');
    consumer.on('message', function(message){
        console.log('message recieved for ' + topic_name + " " + function_name);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        function_name.handle_request(data.data, function(err, res){
            console.log('After request handling: ', res);
            var payload = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId : data.correlationId,
                    data : res
                }),
                partition: 0
            }];

            producer.send(payload, function(err, data){
                console.log('Data: ', data);
            });
            return;

        });
    });
}

handleTopicRequest("login", Login);
handleTopicRequest("announcement",announcement);
handleTopicRequest("assignmentMarks",assignmentMarks);
handleTopicRequest("assignmentView",assignmentView);
handleTopicRequest("codematch",codematch);
handleTopicRequest("courseAnnouncement",courseAnnouncement);
handleTopicRequest("createcourse",createcourse);
handleTopicRequest("displayCodes",displayCodes);
handleTopicRequest("dropCourse",dropCourse);
handleTopicRequest("dropStudent",dropStudent);
handleTopicRequest("enrollCourse",enrollCourse);
handleTopicRequest("enrolled",enrolled);
handleTopicRequest("facultyCreateAssignment",facultyCreateAssignment);
handleTopicRequest("facultyCreateQuiz",facultyCreateQuiz);
handleTopicRequest("generateCode",generateCode);
handleTopicRequest("GeneratePermissionCode",GeneratePermissionCode);
handleTopicRequest("getCourses",getCourses);
handleTopicRequest("getCoursesStudent",getCoursesStudent);
handleTopicRequest("getProfile",getProfile);
handleTopicRequest("quiz",quiz);
handleTopicRequest("quizCalculated",quizCalculated);
handleTopicRequest("recieveMessage",recieveMessage);
handleTopicRequest("search",search);
handleTopicRequest("sendMessage",sendMessage);
handleTopicRequest("sendMessage123",sendMessage);
handleTopicRequest("signup",signup);
handleTopicRequest("studentAssignment",studentAssignment);
handleTopicRequest("updateprofile",updateprofile);
handleTopicRequest("uploadView",uploadView);
handleTopicRequest("ViewAssignmentSubmission",ViewAssignmentSubmission);
handleTopicRequest("ViewLecture",ViewLecture);
handleTopicRequest("viewMarks",viewMarks);
handleTopicRequest("viewPeople",viewPeople);
handleTopicRequest("viewStudents",viewStudents);
handleTopicRequest("waitlist",waitlist);