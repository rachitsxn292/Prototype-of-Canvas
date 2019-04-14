
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';

class ViewSubmission extends Component {
    constructor(props){
        super(props)
            this.state={
                courseid:cookie.load('courseid'),
                fileView:[],
                file: '',
                marks:''
               
            }
    }
    componentDidMount()
    {
        const {courseid} = this.state;
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/ViewAssignmentSubmission', {params: {courseid}})
        .then(res => {
            console.log(res.data);
            this.setState({
                fileView: this.state.fileView.concat(res.data)
            })
        });
    }

    SubmitMarks()
    {
        const {courseid} = this.state;
    axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/assignmentMarks', {
            marks: this.state.marks,
            courseid
        })
        .then(response=>{
            console.log("Marks Submitted");
    });
    } 

    MarksUpload(event){
        this.setState({
            marks:event.target.value
        })
    }
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        let uploads = this.state.fileView.map(fileViews => {
            return(
                <tr key={fileViews.courseid}>
                    <td>{fileViews.courseid}</td>
                    <td>{fileViews.email}</td>
                    <td><a style={{WebkitTextFillColor: 'blue', cursor: 'pointer'}} onClick={()=>{
                        console.log(fileViews.assignmentlocation);
                        this.setState({
                            file: <embed src={fileViews.assignmentlocation} type="application/pdf" width="500px" height="800px"/>
                        })
                    }}>{fileViews.assignmentlocation}</a></td>
                    <td><input type="text" id="AssignmentMarks" name="AssignmentMarks" value={this.state.marks} onChange={this.MarksUpload.bind(this)} placeholder="Enter Marks" /></td>
                </tr>
           )
        })
        return (
            <div>
            {redirectVar}
            <FacultyDashBoard/>
                <div>
                
                </div>
                    <div id="viewUploadsMain">
                                <table  className="tableViewLecture" border="0|1">
                                    <thead>
                                        <tr>
                                            <th>Course ID</th>
                                            <th>Student Email</th>
                                            <th>Assignment Location</th>
                                            <th>Marks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uploads}
                                    </tbody>
                                </table>
                    </div>
                {this.state.file}
                <div>
                <button type="submit" value="submitMarks" onClick={this.SubmitMarks.bind(this)} name="submitMarks" id="submitMarks" >
                    Submit Marks</button>
                </div>
            </div>
        );
    }
}

export default ViewSubmission;