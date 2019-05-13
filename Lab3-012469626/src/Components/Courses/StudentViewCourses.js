import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';
import CourseCardStudent from './CourseCardStudent';
import { withApollo } from 'react-apollo';

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

    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        var details = this.state.items.map(item=>{
                return(
                    <CourseCardStudent key={item.courseid} courseid={item.courseid} coursename={item.coursename} />
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


export default withApollo(StudentViewCourses);