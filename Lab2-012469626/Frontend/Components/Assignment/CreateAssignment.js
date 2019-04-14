import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class CreateAssignment extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            courseid:'',
            assignmentHeading:'',
            assignmentText:'',
            assignmentSubmit:''
        }
    }

        AssignH(event)
        {
            this.setState({
                assignmentHeading:event.target.value
            })
        }
        createAssignmentEmail(event)
        {
            this.setState({
                email:event.target.value
            })
        }
        createAssignmentCID(event)
        {
            this.setState({
                courseid:event.target.value
            })
        }
        AssignT(event)
        {
            this.setState({
                assignmentText:event.target.value
            })
        }
        AssignCreateData(event)
        {
            
            axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/facultyCreateAssignment', {
                assignmentHeading: this.state.assignmentHeading,
                assignmentText: this.state.assignmentText,
                email:this.state.email,
                courseid:this.state.courseid

            },{headers: {'Authorization': localStorage.getItem('authToken')}})
            .then(response=>{
                    if(response.data === true)
                    {
                        console.log("Data Submitted");
                    }
    
        });
        } 
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        return (
            <div>
            {redirectVar}
                <div><FacultyDashBoard/></div>
                <div id="createAssign">
                <h2>Assignment Creation</h2>
                <div >
                        <input type="text" id="createAssignmentEmail" name="createAssignmentEmail" value={this.state.email} onChange={this.createAssignmentEmail.bind(this)} placeholder="Enter Your  Email" />
                </div>
                <div >
                        <input type="text" id="createAssignmentID" name="createAssignmentID" value={this.state.courseid} onChange={this.createAssignmentCID.bind(this)} placeholder="Enter Course ID" />
                </div>
                <div >
                        <input type="text" id="assignmentHeading" name="assignmentHeading" value={this.state.assignmentHead} onChange={this.AssignH.bind(this)} placeholder="Enter Assignment Heading" />
                </div>
                <div>
                        <input type="text" id="assignmentText" name="assignmentText" value={this.state.assignmentText} onChange={this.AssignT.bind(this)}  placeholder="Enter Assignment Description"/>
                </div>
                <div>
                        <button type="submit"  id="SubmitCreateAssignment" value="SubmitCreateAssignment" onClick={this.AssignCreateData.bind(this)} name="SubmitCreateAssignment" id="SubmitCreateAssignment" >Create Assignment</button>
                </div>
                </div>
            </div>
        );
    }
}

export default CreateAssignment;