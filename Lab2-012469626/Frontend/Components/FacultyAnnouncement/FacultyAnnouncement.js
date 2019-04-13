import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';

class FacultyAnnouncement extends Component{
    constructor(props){
        super(props);
        this.state={
            announcementHeading:'',
            announcementText:'',
            courseid:cookie.load('courseid')
        }    
    }

    announcementHeadingData(event)
    {
        this.setState({
            announcementHeading:event.target.value
        })

    }
    announcementTextData(event)
    {
        this.setState({
            announcementText:event.target.value
        })

    }

    AnnouncementData(){
        const {courseid,announcementHeading,announcementText} = this.state;
        axios.post('http://localhost:3001/announcement', {headers: {'Authorization': localStorage.getItem('authToken')}}, {courseid,announcementHeading,announcementText})
        .then(response=>{
                console.log("Inside Faculty Announcements");

    });
    }

    render()
    {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        return(
            <div>
            {redirectVar}
            <FacultyDashBoard/>
            <div id="FacultyAnnouncementLayout">
            
            <h2>Make Faculty Announcement</h2>
                <div>
                        <input type="text" id="announcementHeading" name="announcementHeading" value={this.state.announcementHeading} onChange={this.announcementHeadingData.bind(this)} placeholder="Enter Heading" />
                </div>
                <div>
                        <input type="text" id="announcementText" name="announcementText" value={this.state.announcementText} onChange={this.announcementTextData.bind(this)} placeholder="Enter Text Area" />
                </div>
                <div>
                        <button type="submit" value="submitAnnouncemnt"  id="submitAnnouncemnt" onClick={this.AnnouncementData.bind(this)} >Submit Announcement</button>
                        
                </div>
            </div>
            </div>
        )
    }


}

export default FacultyAnnouncement;