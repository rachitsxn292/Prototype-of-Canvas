
import React, { Component } from 'react';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class EnrollCourse extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            courses:[],
            enroll:'',
            waitlist:'',
            EnterCode:'',
            email:cookie.load('email'),
            courseid:cookie.load('courseid'),
            coursename:cookie.load('coursename'),
            codeData:[],
            search:'',
            page:0,
            limit:2
        }
        // this.EnrollData = this.EnrollData.bind(this);
    }


//     EnrollData(event){
//         this.setState({
//             enroll:event.target.value
//         })
//         const {email,courseid,coursename,enroll}=this.state;
//         console.log(email);
//         axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/enrolled',{email,courseid,coursename,enroll})
//         .then(response=>{
//             if(response.data===true)
//             {
//                 alert("Student Enrolled");
//                 window.location.reload();
//             }

// }) }


    // DropData(event){
    //     const {email,courseid}=this.state;
    //     console.log("Drop Course",email);
    //     axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/dropCourse',{email,courseid})
    //     .then(response=>{
    //         if(response.data===true)
    //         {
    //             alert("Course Dropped");
    //             window.location.reload();
    //         }
    //     })
    // }

    CodeEnter(event){
        this.setState({
            EnterCode:event.target.value
        })
    }

    CodeMatch(){
        const {email,EnterCode,courseid} = this.state;
        axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/codematch',{email,EnterCode,courseid})
        .then(response=>{
            if(response.data===true)
            {
                alert("Waitist Cleared");
                
            }
    });
    }
    searchData(event){
        this.setState({
            search:event.target.value
        })
    }
    searchValue(){
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/search', {search:this.state.search})
        .then(response=>{
            console.log("Seacrh Bar");

        });
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
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/enrollCourse', {params: {courseid, limit, t}})
        .then(res=>{
            this.setState({
                courses: res.data
              
            })
        })
    }
    NxtHandler()
    {
        this.paginate(1);
        let t = this.state.page + 1;
        const {limit, courseid} = this.state;
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/enrollCourse', {params: {courseid, limit, t}})
        .then(res=>{
            this.setState({
                courses: res.data
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
        cookie.save('courseid',this.state.courseid);
        cookie.save('coursename',this.state.coursename);
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/enrollCourse',{params: { limit, t}})
                .then((response) => {
                    console.log(response.data);
                this.setState({
                    courses : this.state.courses.concat(response.data) 
                });
            });
        axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/displayCodes')
                .then((response) => {
                    console.log(response.data);
                this.setState({
                    codeData : this.state.codeData.concat(response.data) 
                });
            });
    }

    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        let datas = this.state.codeData.map(coded => {
            return(
               
                <tr key={coded.courseid}>
                    <td>{coded.email}</td>
                    <td>{coded.courseid}</td>
                    <td>{coded.codes}</td>
                </tr>
           
            )
        })
        let details = this.state.courses.map(course => {
            return(
               
                <tr key={course.courseid}>
                    <td>{course.courseid}</td>
                    <td>{course.coursename}</td>
                    <td>{course.coursecapacity}</td>
                    <td>{course.waitlistcapacity}</td>
                    
                    <td><button key={course.courseid} value="E"  name="enrollCourse" id="enrollCourse" onClick={()=>{
                        const {email}=this.state;
                        const courseid=course.courseid;
                        const coursename=course.coursename;
                        var enroll = "E";
                        console.log('Inside Front End',email,courseid,coursename);
                        axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/enrolled',{email,courseid,coursename,enroll})
                        .then(response=>{
                             if(response.data===true)
                             {
                                alert("Student Enrolled");
                                window.location.reload();
                             }
                            })}}>Enroll Course</button></td>
                    <td><button key={course.courseid} value="W" name="waitlistCourse" id="waitlistCourse" onClick={()=>{
                        const {email}=this.state;
                        const courseid=course.courseid;
                        const coursename=course.coursename;
                        var waitlist = "W";
                        console.log(email);
                        axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/waitlist',{email,courseid,coursename,waitlist})
                        .then(response=>{
                             if(response.data===true)
                             {
                                alert("You are Waitlisted ");
                                window.location.reload();
                             }
                            })}} >Waitlist</button></td>
                    <td><button key={course.courseid} value="D" name="dropCourse" id="dropCourse" onClick={()=>{
                            const {email,courseid}=this.state;
                            axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/dropCourse',{email,courseid})
                            .then(response=>{
                                if(response.data===true)
                                {
                                    alert("Course Dropped");
                                    window.location.reload();
                                }
                            })
                        }
                    }
                     >Drop Course</button></td>
                    
                </tr>
           
            )
        })
        return (
            <div>
            {redirectVar}
                <StudentDashboard/>
                    <div id="enrollCoursemain">
                            <table className="tableEnroll" border="0|1">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Course Name</th>
                                        <th>Course Capacity</th>
                                        <th>Waitlist</th>
                                        <th>Enroll</th>
                                        <th>Waitlist</th>
                                        <th>Drop</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details}
                                </tbody>
                            </table>
                    </div>
                    <div id="codeTData">
                        <table id="CodeTable" border="0|1">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Code</th>
                                <th>Course ID</th>
                            </tr>
                        </thead>
                        <tbody>
                        {datas}
                        </tbody>
                        </table>
                    </div>
                    <div>
                        <button value="" id="Previous1" onClick={this.PrvHandler.bind(this)}  >Previous</button>
                        <button value="" id="Next1" onClick={this.NxtHandler.bind(this)}  >Next</button>
                    </div>
                    <div >
                        <input type="text" id="codeEnter" name="codeEnter" value={this.state.EnterCode} onChange={this.CodeEnter.bind(this)}  placeholder="Enter Code" /><br/><br/>
                        <button type="submit" value="SubmitCode"  id="SubmitCode" onClick={this.CodeMatch.bind(this)}  >Submit Code</button>
                    </div>
                
            </div>
        );
    }
}

export default EnrollCourse;