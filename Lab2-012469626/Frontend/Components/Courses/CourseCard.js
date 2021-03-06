import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import Draggable from 'react-draggable';
class CourseCard extends Component{
    constructor(props){
        super(props);

        this.state={
            courseid: this.props.courseid,
            coursename: this.props.coursename,
            email: this.props.email
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        cookie.save('courseid',this.state.courseid);
        cookie.save('coursename',this.state.coursename);
    }

    render(){   
        cookie.save('coursename', this.state.coursename);
        cookie.save('courseid', this.state.courseid);
        cookie.save('email', this.state.email)
        return(
            <div style={{display: 'inline-block', marginLeft: '30px'}}>
                <Draggable>
                <div className="cardLayout">
                <p style={{fontSize: '30px'}}>{this.props.coursename}</p>
                <button className="buttonCourseCard"><Link style={{backgroundColor: '#3090C7', fontSize: '20px', WebkitTextFillColor: 'white', textDecorationColor: '#3090C7'}} to={{pathname: "/CourseHyperlink",
                                    state: {courseid: this.state.courseid, coursename: this.state.coursename, email: this.state.email}}}>{this.state.courseid}</Link></button> 
                                    
                                    
                </div> 
                </Draggable>
            </div>
                       
        );
    }
}

export default CourseCard;