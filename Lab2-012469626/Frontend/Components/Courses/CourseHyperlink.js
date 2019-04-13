import React, { Component } from 'react';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class CourseHyperlink extends Component {
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        return (
            <div>
            {redirectVar}
            <div>
            <FacultyDashBoard/>
            </div>
            <div id="courseHyperlink">
                <div>
                <button type="submit" id="CreateAssigment" value="CreateAssigment" ><Link to='/CreateAssignment'>Create Assigment</Link></button>
                </div>
                <div>
                    <button type="submit" id="ViewSubmissions" value="ViewSubmissions" ><Link to='/ViewSubmission'>View Submissions</Link></button>
                </div>
                <div>
                    <button type="submit" id="MakeAnnouncements" value="MakeAnnouncements" ><Link to='/FacultyAnnouncement'> Make Announcements</Link></button>
                </div>
                <div>
                    <button type="submit" id="ViewStudents" value="ViewStudents"  ><Link to='/ViewStudents'>View Students</Link></button>
                </div>
                <div>
                    <button type="submit" value="CreateQuiz" id="CreateQuiz"  ><Link to='/CreateQuiz'>Create Quiz</Link></button>
                    
                </div>
                <div>
                    <button type="submit" value="Upload" id="Upload"  ><Link to='/UploadFile'>Upload Lectures and Files</Link></button>
                    
                </div>
            </div>
            </div>
        );
    }
}

export default CourseHyperlink;