import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class FacultyDashBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            email:cookie.load('email'),
        }
    }

    CanvasLogout = () => {
        cookie.remove('email', { path: '/' })
        console.log("Cookie Removed You are logged out");
    }
 
    render()
    {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        return(
            <div id="FacultyDashboard">
            {redirectVar}
            <img style={{width: '300px', height: '200px'}} src="http://www.sjsu.edu/communications/pics/identity/043014_Monogram_WEB_02.png" alt="logo" />
                <div>
                <Link to='/Profile'><p id="nameOn" style={{WebkitTextFillColor: 'blue'}}>{this.state.email}</p></Link>
                </div>
                <div>
                    <button type="submit" id="updateProfile" value="updateProfile"  ><Link to='/Profile'>Update Profile</Link></button>
                </div>
                <div>
                    <button type="submit" id="CreateCourse" value="CreateCourse"  ><Link to='/Createcourse'>Create Course</Link></button>
                </div>
                <div>
                    <button type="submit" id="abc" value="GeneratePermissionCode"  > <Link to='/AddPermissionCode'>Generate Permission Code</Link></button>
                </div>
                <div>
                    <button type="submit" id="ViewCourses" value="ViewCourses"  ><Link to='/FacultyViewCourses'>View Courses</Link></button>
                </div>
                <div>
                <button type="submit" className="inbox" value="inbox" ><Link to='/RecieveMessage'>Inbox</Link></button>
                </div>
                <div>
                <button type="submit" className="sendMessage" value="sendMessage" ><Link to='/SendMessage'>Send Message</Link></button>
                </div>
                <div>
                    <button type="submit" id="SignoutStudent" value="SignoutStudent" onClick = {this.CanvasLogout}   ><Link to='/'>Sign Out</Link></button>
                </div>
                
               
            </div>
        )
    }
}

export default FacultyDashBoard;