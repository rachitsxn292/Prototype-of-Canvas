import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';

class ViewCollegues extends Component {
    constructor(props){
        super(props)
        {
            this.state={
                students:[],
                courseid:cookie.load('courseid'),
                page:0,
                limit:1
            }
        }
    }
    PrvHandler()
    {
        let t = this.state.page-1;
        if(t<0 || this.state.page===0){
            t=0;
        }
        else{
            this.paginate(-1);
        }
        const {limit, courseid} = this.state;
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/viewPeople', {params: {courseid, limit, t}})
        .then(res=>{
            this.setState({
                students: res.data
              
            })
        })
    }
    NxtHandler()
    {
        this.paginate(1);
        let t = this.state.page + 1;
        const {limit, courseid} = this.state;
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/viewPeople', {params: {courseid, limit, t}})
        .then(res=>{
            this.setState({
                students: res.data
            })
        })
    }
    paginate(n)
    {
        this.setState({page:this.state.page+n})
    }
    componentDidMount(){
        let t = this.state.page-1;
        if(t<0 || this.state.page===0){
            t=0;
        }
        else{
            this.paginate(-1);
        }
        const {limit, courseid} = this.state;
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/viewPeople', {params: {courseid, limit, t}})
        .then(res=>{
            this.setState({
                students: res.data
            })
        })
        // const {courseid} = this.state;
        // console.log(courseid);
        // axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/viewPeople', {params: {courseid}})
        // .then(res => {
        //     console.log(res.data);
        //     this.setState({
        //         students: this.state.students.concat(res.data)
        //     })
        // });
        
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
                </tr>
            )})
        return (
            <div>
            <StudentDashboard/>
            <div id="viewStudentsMain">
            <h3 className="headingCollegues">All Students Enrolled in Course</h3>
                            <table  className="tableViewStudents" border="0|1" >
                                <thead>
                                    <tr>
                                        <th>EMAIL</th>
                                        <th>Course ID</th>
                                        <th>Status</th>
                                        <th>Course Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details}
                                </tbody>
                            </table>
                    </div>
            <div>
            <button value="" id="Previous" onClick={this.PrvHandler.bind(this)}  >Previous</button>
            <button value="" id="Next" onClick={this.NxtHandler.bind(this)}  >Next</button>
            </div>
                
            </div>
        );
    }
}

export default ViewCollegues;