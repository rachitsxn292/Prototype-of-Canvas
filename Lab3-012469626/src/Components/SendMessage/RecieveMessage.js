import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';

class RecieveMessage extends Component {
    constructor(props){
        super(props)
        {
            this.state={
                students:[],
                email:cookie.load('email'),
            }
        }
    }
    
    componentDidMount(){
        const {email} = this.state;
        console.log(email);
        axios.get('http://localhost:3001/recieveMessage', {params: {email}})
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
                <tr key={student.senderemail}>
                    <td>{student.senderemail}</td>
                    <td>{student.recieveremail}</td>
                    <td>{student.message}</td>
                </tr>
            )})
        return (
            <div>
            <StudentDashboard/>
            <div id="viewStudentsMain">
            <h3 className="headingCollegues"></h3>
                            <table  className="tableViewStudents" border="0|1" >
                                <thead>
                                    <tr>
                                        <th>SENDER EMAIL</th>
                                        <th>RECIEVER EMAIL</th>
                                        <th>MESSAGE</th>
                
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

export default RecieveMessage;