import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';

class SendMessage extends Component {
    constructor(props){
        super(props)
        {
            this.state={
                students:[],
                courseid:cookie.load('courseid'),
                email:cookie.load('email'),
                message:''
            }
        }
    }

    componentDidMount(){
        const {courseid} = this.state;
        console.log(courseid);
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/sendMessage123', {params: {courseid}})
        .then(res => {
            console.log(res.data);
            this.setState({
                students: this.state.students.concat(res.data)
            })
        });
    }
    messageSent(event)
    {
        this.setState({
            message:event.target.value
        })
    }
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        let details = this.state.students.map(student => {
            return(
                <tr key={student.name}>
                    <td>{student.name}</td>
                    <td>{student.role}</td>
                    <td>{student.username}</td>
                    <td><input type="text" id="assignmentHeading" value={this.state.value} onChange={this.messageSent.bind(this)} placeholder="Enter Message" /></td>
                    <td><button  name="SubmitMesage" id="SubmitMesage" onClick={()=>{
                        const role=student.role;
                        const {email}=this.state;
                        const senderemail=student.username;
                        axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/sendMessage',{email,role,senderemail,message:this.state.message})
                        .then(res=>{
                            if(res)
                            {
                                alert("Message Sent");
                                window.location.reload();
                            }
                        })
                    }} >Send Message</button></td>
                </tr>
            )})
        return (
            <div>
            <StudentDashboard/>
            <div id="viewStudentsMain">
            <h3 className="headingCollegues">All Contacts</h3>
                            <table  className="tableViewStudents" border="0|1" >
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>ROLE</th>
                                        <th>EMAIL</th>
                                        <th>MESSAGE</th>
                                        <th>SEND MESSAGE</th>
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


export default SendMessage;