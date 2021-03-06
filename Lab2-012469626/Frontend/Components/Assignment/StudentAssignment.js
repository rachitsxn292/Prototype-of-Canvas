import React, { Component } from 'react';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class StudentAssignment extends Component {

    constructor(props){
        super(props)
        {
            this.state={
                assignment:[],
                courseid:cookie.load('courseid')
            }
        }
    }
    componentDidMount(){
        const {courseid} = this.state;
        console.log(courseid);
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/studentAssignment', {params: {courseid}})
        .then(res => {
            console.log(res.data);
            this.setState({
                assignment: this.state.assignment.concat(res.data)
            })
        });
    }
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        let details = this.state.assignment.map(assignments => {
            return(
               
                <tr key={assignments.courseid}>
                    <td>{assignments.courseid}</td>
                    <td>{assignments.heading}</td>
                    <td>{assignments.text}</td>
                   
                </tr>
           
            )
        })
        return (
            <div>
            {redirectVar}
                <StudentDashboard/>
                    <div id="viewAssignmentMain">
                            <table  className="tableViewAssignment" border="0|1">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Assignment Heading</th>
                                        <th>Assignment Text</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details}
                                </tbody>
                            </table>
                    </div>
                
            </div>
        );
    }
}

export default StudentAssignment;