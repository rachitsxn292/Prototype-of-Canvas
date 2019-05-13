import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import CourseCard from './CourseCard';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';
import Draggable from 'react-draggable';
import { withApollo } from 'react-apollo';


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
        this.props.client.query({
            query: EnrolledQuery,
            variables: {
                email: email
            }
        }).then(result=>{
            this.setState({
                items: this.state.items.concat(result.data.courseCreated)
            })
        })
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

export default withApollo(FacultyViewCourses);
