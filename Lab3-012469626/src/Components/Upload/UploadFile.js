import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';

class UploadFile extends Component {
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

    UploadFile(){
        const {email,courseid}=this.state;
        const data = new FormData()
        data.set('email', email);
        data.set('courseid', courseid);
        data.append('file', this.state.selectedFile, this.state.selectedFile.filename)
        axios.post('http://localhost:3001/upload',data,{email,courseid})
        .then(res=>{
            alert("File Uploaded");
        })

    }
    componentDidMount()
    {
        const {courseid} = this.state;
        axios.get('http://localhost:3001/uploadView', {params: {courseid}})
        .then(res => {
            console.log(res.data);
            this.setState({
                fileView: this.state.fileView.concat(res.data)
            })
        });
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
                    <td><a style={{WebkitTextFillColor: 'blue', cursor: 'pointer'}} onClick={()=>{
                        console.log(fileViews.filelocation);
                        this.setState({
                            file: <embed src={fileViews.filelocation} type="application/pdf" width="500px" height="800px"/>
                        })
                    }}>{fileViews.filelocation}</a></td>
                    <td>{fileViews.filename}</td>
                </tr>
           
            )
        })
        return (
            <div>
            {redirectVar}
            <FacultyDashBoard/>
                <div>
                <div>
                <label id="FileLabel">Choose File to be uploaded</label><br/><br/>
                <input type="file" id="uploadQuiz" name="file" onChange={this.onChange} />
                <button value="SubmitUploadFile" id="SubmitUploadFile" onClick={this.UploadFile.bind(this)} >Upload File</button>
                </div>
                <div id="viewUploadsMain">
                            <table  className="tableViewUploads" border="0|1">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>File Location</th>
                                        <th>File Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploads}
                                </tbody>
                            </table>
                            </div>
                </div>
                <br/>
                {this.state.file}
            </div>
        );
    }
}

export default UploadFile;