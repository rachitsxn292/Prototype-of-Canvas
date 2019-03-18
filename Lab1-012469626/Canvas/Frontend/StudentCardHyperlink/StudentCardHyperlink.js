import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import StudentDashboard from '../StudentDashboard/StudentDashboard';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class StudentCardHyperlink extends Component {
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        return (
            <div>
            {redirectVar}
            <StudentDashboard/>
            <div id="studentHyperlink">
                <div >
                <button type="submit" id="QuizLink" value="QuizLink" ><Link to='/Quiz'>Quiz</Link></button>
                </div>
                <div>
                    <button type="submit" id="ViewGrades" value="ViewGrades" ><Link to='/AnnouncementRecieve'>Annoucements</Link></button>
                </div>
                <div>
                    <button type="submit" id="ViewAssignment" value="ViewAssignment" ><Link to='/StudentAssignment'>View Assignment</Link></button>
                </div>
                <div>
                    <button type="submit" id="ViewLecture" value="ViewLecture" ><Link to='/ViewLecture'>View Lecture</Link></button>
                </div>
                <div>
                    <button type="submit" id="ViewGrades" value="ViewGrades" ><Link to='/ViewGrades'>View Grades</Link></button>
                </div>
                <div>
                    <button type="submit" id="ViewPeople" value="ViewPeople" ><Link to='/ViewCollegues'>View People</Link></button>
                </div>
                <div>
                    <button type="submit" id="SubmitAssignment" value="SubmitAssignment" ><Link to='/SubmitAssignment'>Submit Assignment</Link></button>
                </div>
                </div>
            </div>
        );
    }
}

export default StudentCardHyperlink;