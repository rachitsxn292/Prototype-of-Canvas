import React, { Component } from 'react';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class AnnouncementRecieve extends Component {

    constructor(props){
        super(props)
        {
            this.state={
                announcement:[],
                courseid:cookie.load('courseid')
            }
        }
    }
    componentDidMount(){
        const {courseid} = this.state;
        console.log(courseid);
        axios.get('http://localhost:3001/courseAnnouncement', {params: {courseid}})
        .then(res => {
            console.log(res.data);
            this.setState({
                announcement: this.state.announcement.concat(res.data)
            })
        });
    }
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        let details = this.state.announcement.map(announcements => {
            return(
               
                <tr key={announcements.COURSEID}>
                    <td>{announcements.COURSEID}</td>
                    <td>{announcements.HEADING}</td>
                    <td>{announcements.TEXT}</td>
                   
                </tr>
           
            )
        })
        return (
            <div>
            {redirectVar}
                <StudentDashboard/>
                    <div id="viewAnnouncementMain">
                            <table  className="tableViewAnnouncement" border="0|1">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Heading</th>
                                        <th>Text</th>
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

export default AnnouncementRecieve;