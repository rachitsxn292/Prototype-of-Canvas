import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import CourseCard from './CourseCard';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';
import Draggable from 'react-draggable';


class FacultyViewCourses extends Component{
    constructor(){
        super();
        this.state={
            email: cookie.load('email'),
            items: []
        }
    }

    componentDidMount(){
        const {email} = this.state;
        console.log(email);
        axios.get('http://localhost:3001/getCourses/', {params: {email}})
        .then(res => {
            console.log(res.data);
            this.setState({
                items: this.state.items.concat(res.data)
            })
        });
    }

    render(){
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        var details = this.state.items.map(item=>{
                return(
                    
                    <CourseCard key={item.courseid} courseid={item.courseid} coursename={item.coursename} email={this.state.email}/>
                )
        })
        return(
            <div>
            {redirectVar}
            <FacultyDashBoard/>
                <div id="FacultyViewCourse">
                    
                {details}
                </div>
                
            </div>
        );
    }
}

export default FacultyViewCourses;