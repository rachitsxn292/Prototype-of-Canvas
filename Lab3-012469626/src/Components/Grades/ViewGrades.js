import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';

class ViewGrades extends Component {
    constructor(props){
        super(props)
        {
            this.state={
                marks:[],
                courseid:cookie.load('courseid'),
                email:cookie.load('email')
            }
        }
    }

    componentDidMount(){
        const {email} = this.state;
        axios.get('http://localhost:3001/viewMarks', {params: {email}})
        .then(res => {
            console.log(res.data);
            this.setState({
                marks: this.state.marks.concat(res.data)
            })
        });
    }
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        let details = this.state.marks.map(mark => {
            return(
               
                <tr key={mark.courseid}>
                    <td>{mark.courseid}</td>
                    <td>{mark.email}</td>
                    <td>{mark.assignmentlocation}</td>
                    <td>{mark.assignmentgrade}</td>
                </tr>
           
            )
        })
        return (
            <div>
            {redirectVar}
            <StudentDashboard/>
                <div id="viewStudentsMarks">
                        <table  className="tableViewAmrks" border="0|1">
                            <thead>
                                <tr>
                                    <th>COURSE ID</th>
                                    <th>EMAIL</th>
                                    <th>ASSIGNMENT FILE</th>
                                    <th>GRADE</th>
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

export default ViewGrades;