import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';

class ViewCollegues extends Component {
    constructor(props){
        super(props)
        {
            this.state={
                students:[],
                courseid:cookie.load('courseid')
            }
        }
    }

    componentDidMount(){
        const {courseid} = this.state;
        console.log(courseid);
        axios.get('http://localhost:3001/viewPeople', {params: {courseid}})
        .then(res => {
            console.log(res.data);
            this.setState({
                students: this.state.students.concat(res.data)
            })
        });
    }
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        let details = this.state.students.map(student => {
            return(
               
                <tr key={student.COURSEID}>
                    <td>{student.EMAIL}</td>
                    <td>{student.COURSEID}</td>
                    <td>{student.STATUS}</td>
                    <td>{student.COURSENAME}</td>
                     
                </tr>
           
            )
        })
        return (
            <div>
            <StudentDashboard/>
            <div id="viewStudentsMain">
                            <table  className="tableViewStudents" border="0|1">
                                <thead>
                                    <tr>
                                        <th>EMAIL</th>
                                        <th>Course ID</th>
                                        <th>Status</th>
                                        <th>Course Name</th>
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

export default ViewCollegues;