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
               
                <tr key={student.COURSEID}>
                    <td>{student.EMAIL}</td>
                    <td>{student.COURSEID}</td>
                    <td>{student.STATUS}</td>
                    <td>{student.COURSENAME}</td>
                    <td><button  key={student.COURSEID} name="GenerateCode" id="GenerateCode" onClick={()=>{
                        const email=student.EMAIL;
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