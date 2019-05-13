import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';

class AddPermissionCode extends Component {

    constructor(props){
        super(props)
        {
            this.state={
                students:[],
                courseid:cookie.load('courseid')
            }
        }
    }
    GenerateCode(){

    }
    componentDidMount(){
        const {courseid} = this.state;
        console.log(courseid);
        axios.get('http://localhost:3001/GeneratePermissionCode', {params: {courseid}})
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
                    <td><button  key={student.courseid} name="GenerateCode" id="GenerateCode" onClick={()=>{
                        const email=student.email;
                        const {courseid}=this.state;
                        axios.post('http://localhost:3001/generateCode',{email,courseid})
                        .then(res=>{
                            if(res)
                            {
                                alert("Code Generated");
                            }
                        })
                    }} >Generate Code</button></td>
                </tr>
           
            )
        })
        return (
            <div>
            {redirectVar}
               <FacultyDashBoard/>
                    <div id="viewTableGenerate">
                            <table  className="tableGenerate" border="0|1">
                                <thead>
                                    <tr>
                                        <th>EMAIL</th>
                                        <th>Course ID</th>
                                        <th>Status</th>
                                        <th>Course Name</th>
                                        <th>Generate Permission Code</th>
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

export default AddPermissionCode;