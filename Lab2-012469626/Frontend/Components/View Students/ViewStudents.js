import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';

class ViewStudents extends Component {
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
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/viewStudents', {params: {courseid}})
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
               
                <tr key={student.courseid}>
                    <td>{student.email}</td>
                    <td>{student.courseid}</td>
                    <td>{student.status}</td>
                    <td>{student.coursename}</td>
                    <td><button  key={student.courseid} name="DropStudent" id="DropStudent" onClick={()=>{
                        const email=student.email;
                        const {courseid}=this.state;
                        axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/dropStudent',{email,courseid})
                        .then(res=>{
                            if(res)
                            {
                                alert("Student Dropped");
                                window.location.reload();
                            }
                        })
                    }} >Drop Student</button></td>
                </tr>
           
            )
        })
        return (
            <div>
            {redirectVar}
                <FacultyDashBoard/>
                    <div id="viewStudentsMain">
                            <table  className="tableViewStudents" border="0|1">
                                <thead>
                                    <tr>
                                        <th>EMAIL</th>
                                        <th>Course ID</th>
                                        <th>Status</th>
                                        <th>Course Name</th>
                                        <th>Drop Student</th>
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

export default ViewStudents;