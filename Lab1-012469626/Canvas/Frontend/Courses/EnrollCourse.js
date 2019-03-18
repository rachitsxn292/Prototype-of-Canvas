
import React, { Component } from 'react';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class EnrollCourse extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            courses:[],
            enroll:'',
            waitlist:'',
            EnterCode:'',
            email:cookie.load('email'),
            courseid:cookie.load('courseid'),
            coursename:cookie.load('coursename'),
            codeData:[]
        }
        // this.EnrollData = this.EnrollData.bind(this);
    }


//     EnrollData(event){
//         this.setState({
//             enroll:event.target.value
//         })
//         const {email,courseid,coursename,enroll}=this.state;
//         console.log(email);
//         axios.post('http://localhost:3001/enrolled',{email,courseid,coursename,enroll})
//         .then(response=>{
//             if(response.data===true)
//             {
//                 alert("Student Enrolled");
//                 window.location.reload();
//             }

// }) }


    DropData(event){
        const {email,courseid}=this.state;
        console.log("Drop Course",email);
        axios.post('http://localhost:3001/dropCourse',{email,courseid})
        .then(response=>{
            if(response.data===true)
            {
                alert("Course Dropped");
                window.location.reload();
            }
        })
    }

    CodeEnter(event){
        this.setState({
            EnterCode:event.target.value
        })
    }

    CodeMatch(){
        const {email,EnterCode,courseid} = this.state;
        axios.post('http://localhost:3001/codematch',{email,EnterCode,courseid})
        .then(response=>{
            if(response.data===true)
            {
                alert("Waitist Cleared");
                
            }
    });
    }

    componentDidMount(){
        axios.get('http://localhost:3001/enrollCourse')
                .then((response) => {
                    console.log(response.data);
                this.setState({
                    courses : this.state.courses.concat(response.data) 
                });
            });
        axios.get('http://localhost:3001/displayCodes')
                .then((response) => {
                    console.log(response.data);
                this.setState({
                    codeData : this.state.codeData.concat(response.data) 
                });
            });
    }

    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        let datas = this.state.codeData.map(coded => {
            return(
               
                <tr key={coded.COURSEID}>
                    <td>{coded.EMAIL}</td>
                    <td>{coded.COURSEID}</td>
                    <td>{coded.CODE}</td>
                </tr>
           
            )
        })
        let details = this.state.courses.map(course => {
            return(
               
                <tr key={course.COURSEID}>
                    <td>{course.COURSEID}</td>
                    <td>{course.COURSENAME}</td>
                    <td>{course.COURSECAPACITY}</td>
                    <td>{course.WAITLISTCAPACITY}</td>
                    
                    <td><button key={course.COURSEID} value="E"  name="enrollCourse" id="enrollCourse" onClick={()=>{
                        const {email}=this.state;
                        const courseid=course.COURSEID;
                        const coursename=course.COURSENAME;
                        var enroll = "E";
                        console.log(email);
                        axios.post('http://localhost:3001/enrolled',{email,courseid,coursename,enroll})
                        .then(response=>{
                             if(response.data===true)
                             {
                                alert("Student Enrolled");
                                window.location.reload();
                             }
                            })}}>Enroll Course</button></td>
                    <td><button key={course.COURSEID} value="W" name="waitlistCourse" id="waitlistCourse" onClick={()=>{
                        const {email}=this.state;
                        const courseid=course.COURSEID;
                        const coursename=course.COURSENAME;
                        var waitlist = "W";
                        console.log(email);
                        axios.post('http://localhost:3001/waitlist',{email,courseid,coursename,waitlist})
                        .then(response=>{
                             if(response.data===true)
                             {
                                alert("You are Waitlisted ");
                                window.location.reload();
                             }
                            })}} >Waitlist</button></td>
                    <td><button key={course.COURSEID} value="D" name="dropCourse" id="dropCourse" onClick={this.DropData.bind(this)} >Drop Course</button></td>
                    
                </tr>
           
            )
        })
        return (
            <div>
            {redirectVar}
                <StudentDashboard/>
                    <div id="enrollCoursemain">
                            <table className="tableEnroll" border="0|1">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Course Name</th>
                                        <th>Course Capacity</th>
                                        <th>Waitlist</th>
                                        <th>Enroll</th>
                                        <th>Waitlist</th>
                                        <th>Drop</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details}
                                </tbody>
                            </table>
                    </div>
                    <div id="codeTData">
                        <table id="CodeTable" border="0|1">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Code</th>
                                <th>Course ID</th>
                            </tr>
                        </thead>
                        <tbody>
                        {datas}
                        </tbody>
                        </table>
                    </div>
                    <div >
                        <input type="text" id="codeEnter" name="codeEnter" value={this.state.EnterCode} onChange={this.CodeEnter.bind(this)}  placeholder="Enter Code" /><br/><br/>
                        <button type="submit" value="SubmitCode"  id="SubmitCode" onClick={this.CodeMatch.bind(this)}  >Submit Code</button>
                    </div>
                
            </div>
        );
    }
}

export default EnrollCourse;