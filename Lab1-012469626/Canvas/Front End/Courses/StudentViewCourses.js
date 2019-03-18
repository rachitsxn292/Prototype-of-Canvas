import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';
import CourseCardStudent from './CourseCardStudent';

class StudentViewCourses extends Component {

    constructor(){
        super()
        {
            this.state={
                items:[],
                email:cookie.load('email'),
            }
        }
    }
        componentDidMount()
        {
            const {email} = this.state;
            axios.get('http://localhost:3001/getCoursesStudent', {params: {email}})
            .then(res => {
                console.log(res.data);
                this.setState({
                    items: this.state.items.concat(res.data)
                })
            });
        }

    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        var details = this.state.items.map(item=>{
                return(
                    <CourseCardStudent key={item.COURSEID} courseid={item.COURSEID} coursename={item.COURSENAME} />
                )
        })
        return(
            <div>
            {redirectVar}
            <StudentDashboard/>
                <div id="StudentViewCourse">
                {details}
                </div>
                
            </div>
        );
    }
}

export default StudentViewCourses;