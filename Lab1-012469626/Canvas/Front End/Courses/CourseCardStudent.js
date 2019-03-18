import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
class CourseCardStudent extends Component{
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
        // cookie.save('email',this.state.email);

    }

    render(){
        
        return(
            <div style={{display: 'inline-block', marginLeft: '30px'}}>
                <div className="cardLayout">
                <p style={{fontSize: '30px'}}>{this.props.coursename}</p>
                <button className="buttonCourseCard" onClick={this.onClick}><Link style={{backgroundColor: '#3090C7', fontSize: '20px', WebkitTextFillColor: 'white', textDecorationColor: '#3090C7'}}  onClick={this.onClick} to={{pathname: "/StudentCardHyperlink",
                                    state: {courseid: this.state.courseid, coursename: this.state.coursename, email: this.state.email}}}>{this.state.courseid}</Link></button> 
                                    
                                    
                </div> 
            </div>
                       
        );
    }
}

export default CourseCardStudent;