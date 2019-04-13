
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';

class ViewLecture extends Component {
    constructor(props){
        super(props)
            this.state={
                courseid:cookie.load('courseid'),
                fileView:[],
                file: ''
               
            }
    }
    componentDidMount()
    {
        const {courseid} = this.state;
        axios.get('http://localhost:3001/ViewLecture', {params: {courseid}})
        .then(res => {
            console.log(res.data);
            this.setState({
                fileView: this.state.fileView.concat(res.data)
            })
        });
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
            <StudentDashboard/>
                <div>
                
                </div>
                    <div id="viewUploadsMain">
                                <table  className="tableViewLecture" border="0|1">
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
                {this.state.file}
            </div>
        );
    }
}

export default ViewLecture;