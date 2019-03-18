import React from 'react';
import ReactDOM from 'react-dom';
import Loginmain from './Components/Login/login';
import Signup from './Components/Signup/signup';
import FacultyDashBoard from './Components/FacultyDashboard/FacultyDashboard';
import FacultyAnnouncement from './Components/FacultyAnnouncement/FacultyAnnouncement';
import Createcourse from './Components/Courses/CreateCourse';
import FacultyViewCourses from './Components/Courses/FacultyViewCourses';
import CreateAssignment from './Components/Assignment/CreateAssignment';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import CourseHyperlink from './Components/Courses/CourseHyperlink'
import StudentViewCourses from './Components/Courses/StudentViewCourses';
import ViewStudents from './Components/View Students/ViewStudents';
import Profile from './Components/Profile/Profile';
import Quiz from './Components/Quiz/Quiz';
import AnnouncementRecieve from './Components/FacultyAnnouncement/AnnouncementRecieve';
import StudentCardHyperlink from './StudentCardHyperlink/StudentCardHyperlink';
import StudentAssignment from './Components/Assignment/StudentAssignment';
import CreateQuiz from './Components/Quiz/CreateQuiz';
import UploadFile from './Components/Upload/UploadFile'
import ViewGrades from './Components/Grades/ViewGrades';
import EnrollCourse from './Components/Courses/EnrollCourse';
import ViewSubmission from './Components/Submissions/ViewSubmission';
import ViewLecture from './Components/View Lecture/ViewLecture';
import SubmitAssignment from './Components/Assignment/SubmitAssignment';
import ViewCollegues from './Components//ViewCollegues/ViewCollegues';
import AddPermissionCode from './Components/PermissionCode/AddPermissionCode';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';

const App=()=>{
    
    return(
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Loginmain}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/FacultyDashBoard" component={FacultyDashBoard}/>
                <Route path="/Createcourse" component={Createcourse}/>
                <Route path="/FacultyAnnouncement" component={FacultyAnnouncement}/>
                <Route path="/FacultyViewCourses" component={FacultyViewCourses}/>
                <Route path="/CreateAssignment" component={CreateAssignment}/>
                <Route path="/StudentDashboard" component={StudentDashboard}/>
                <Route path="/CourseHyperlink" component={CourseHyperlink}/>
                <Route path="/StudentViewCourses" component={StudentViewCourses}/>
                <Route path="/Profile" component={Profile}/>
                <Route path="/EnrollCourse" component={EnrollCourse}/>
                <Route path="/ViewStudents" component={ViewStudents}/>
                <Route path="/Quiz" component={Quiz}/>
                <Route path="/StudentCardHyperlink" component={StudentCardHyperlink}/>
                <Route path="/AnnouncementRecieve" component={AnnouncementRecieve}/>
                <Route path="/StudentAssignment" component={StudentAssignment}/>
                <Route path="/CreateQuiz" component={CreateQuiz}/>
                <Route path="/SubmitAssignment" component={SubmitAssignment}/>
                <Route path="/UploadFile" component={UploadFile}/>
                <Route path="/ViewGrades" component={ViewGrades}/>
                <Route path="/AddPermissionCode" component={AddPermissionCode}/>
                <Route path="/ViewSubmission" component={ViewSubmission}/>
                <Route path="/ViewLecture" component={ViewLecture}/>
                <Route path="/ViewCollegues" component={ViewCollegues}/>


            </div>
        </BrowserRouter>
        
    )

}


ReactDOM.render(<App />, document.getElementById('root'));
