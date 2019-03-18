import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Createcourse extends Component{

    constructor(props){
        super(props);
        this.state={
            courseid:'',
            coursename:'',
            coursedept:'',
            coursedes:'',
            courseroom:'',
            coursecapacity:'',
            waitlistcapacity:'',
            courseteam:'',
            email:''
        }    
    }
    CourseID(event){
        this.setState({
            courseid:event.target.value
        })
    }
    CourseName(event){
        this.setState({
            coursename:event.target.value
        })
    }
    CourseDept(event){
        this.setState({
            coursedept:event.target.value
        })
    }
    CourseCapacity(event){
        this.setState({
            coursecapacity:event.target.value
        })
    }
    CourseDes(event){
        this.setState({
            coursedes:event.target.value
        })
    }
    CourseRoom(event){
        this.setState({
            courseroom:event.target.value
        })
    }
    WaitlistCapacity(event){
        this.setState({
            waitlistcapacity:event.target.value
        })
    }
    CourseTeam(event){
        this.setState({
            courseteam:event.target.value
        })
    }
    Email(event){
        this.setState({
            email:event.target.value
        })
    }
    CreateCourseData(event)
    {
        
        axios.post('http://localhost:3001/createcourse', {
            courseid:this.state.courseid,
            coursename:this.state.coursename,
            coursedept:this.state.coursedept,
            coursedes:this.state.coursedes,
            courseroom:this.state.courseroom,
            coursecapacity:this.state.coursecapacity,
            waitlistcapacity:this.state.waitlistcapacity,
            courseteam:this.state.courseteam,
            email:this.state.email
        })
        .then(response=>{
                if(response.data==="true")
                {
                    this.props.history.push('/FacultyDashBoard');
                }

    });
    }
    

    render()
    {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        return(
            <div >
            {redirectVar}
            <div><FacultyDashBoard/></div>
            
            <div id="CourseInput" >
            <h2>Create Course</h2>
                <div>
                <input type="text" id="courseid" name="courseid" value={this.state.courseid} onChange={this.CourseID.bind(this)} placeholder="Enter Course ID" />
                </div>
                <div>
                <input type="text" id="email" name="email" value={this.state.email} onChange={this.Email.bind(this)} placeholder="Enter Your Email" />
                </div>
                <div>
                <input type="text" id="coursename" name="coursename" value={this.state.coursename} onChange={this.CourseName.bind(this)} placeholder="Enter Course Name" />
                </div>
                <div>
                <input type="text" id="coursedept" name="coursedept" value={this.state.coursedept} onChange={this.CourseDept.bind(this)} placeholder="Enter Course Department" />
                </div>
                <div>
                <input type="text" id="coursedes" name="coursedes" value={this.state.coursedes} onChange={this.CourseDes.bind(this)} placeholder="Enter Course Description" />
                </div>
                <div>
                <input type="text" id="courseroom" name="courseroom" value={this.state.courseroom} onChange={this.CourseRoom.bind(this)} placeholder="Enter Course Room" />
                </div>
                <div>
                <input type="text" id="coursecapacity" name="coursecapacity" value={this.state.coursecapacity} onChange={this.CourseCapacity.bind(this)} placeholder="Enter Course Capacity" />
                </div>
                <div>
                <input type="text" id="waitlistcapacity" name="waitlistcapacity" value={this.state.waitlistcapacity} onChange={this.WaitlistCapacity.bind(this)} placeholder="Enter Waitlist Capacity" />
                </div>
                <div>
                <input type="text" id="courseteam" name="courseteam" value={this.state.courseteam} onChange={this.CourseTeam.bind(this)} placeholder="Enter Course Team" />
                </div>
                <div>
                    <button type="submit"  value="CourseDetails" onClick={this.CreateCourseData.bind(this)}  name="CourseDetails" id="CourseDetails" >
                    <Link to='/signup'>Submit</Link></button>
                </div>
                </div>
            </div>
        )
    }
}


export default Createcourse;