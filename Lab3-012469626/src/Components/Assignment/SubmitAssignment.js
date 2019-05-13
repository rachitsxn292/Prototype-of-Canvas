import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';


class SubmitAssignment extends Component {
    constructor(props){
        super(props)
        
            this.state={
                courseid:cookie.load('courseid'),
                email:cookie.load('email'),
                selectedFile: null, 
                fileView:[],
                file: ''
               
            }

            this.onChange = this.onChange.bind(this);
    }
    componentDidMount()
    {
        const {courseid,email} = this.state;
        axios.get('http://localhost:3001/assignmentView', {params: {courseid,email}})
        .then(res => {
            console.log(res.data);
            this.setState({
                fileView: this.state.fileView.concat(res.data)
            })
        });
    }
    UploadAssignment(){
        const {email,courseid}=this.state;
        const data = new FormData()
        data.set('email', email);
        data.set('courseid', courseid);
        data.append('file', this.state.selectedFile, this.state.selectedFile.filename)
        axios.post('http://localhost:3001/uploadAssignment',data,{email,courseid})
        .then(res=>{
            alert("Assignment Uploaded");
        })

    }
    onChange(event){
        this.setState({
            selectedFile: event.target.files[0]
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
                </tr>
           
            )
        })
        return (
            <div>
            {redirectVar}
                <FacultyDashBoard/>
                <div id="SubmitAssignmentDiv">
                <label id="AssignmentLabel">Choose Assignment to be uploaded</label><br/><br/>
                <input type="file" id="AssignmentUploadS" name="file" onChange={this.onChange} /><br/><br/>
                <button value="SubmitUploadAssi" id="SubmitUploadAssi" onClick={this.UploadAssignment.bind(this)} >Upload Assignment</button>
                </div>
                <div id="viewUploadsMain">
                            <table  className="tableViewAssignment" border="0|1">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Email</th>
                                        <th>File Location</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploads}
                                </tbody>
                            </table>
                            </div>
            </div>
        );
    }
}

export default SubmitAssignment;