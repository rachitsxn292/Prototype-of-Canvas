import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';

class Quiz extends Component {
    constructor(props){
        super(props)
        {
            this.state={
                quiz:[],
                courseid: cookie.load('courseid'),
                email:cookie.load('email'),
                option:''
            }
        }
    }
    componentDidMount(){
        const {courseid} = this.state;
        console.log("Inside Quiz Front ",courseid);
        axios.get('http://localhost:3001/quiz', {params: {courseid}})
        .then(res => {
            console.log(res.data);
            this.setState({
                quiz: this.state.quiz.concat(res.data)
            })
        });
    }
    OptionAnswer(event){
        this.setState({
            option:event.target.value
        })

    } 
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        let details = this.state.quiz.map(quizs => {
            return(
            <div>
                <label >{quizs.ques}</label><br/>
                <label >{quizs.option1}</label>
                <input type="checkbox"  name="options" value={quizs.option1} onChange={this.OptionAnswer.bind(this)}/><br/>
                <label >{quizs.option2}</label>
                <input type="checkbox"  name="options" value={quizs.option2} onChange={this.OptionAnswer.bind(this)}/><br/>
                <label >{quizs.option3}</label>
                <input type="checkbox"  name="options" value={quizs.option3} onChange={this.OptionAnswer.bind(this)}/><br/>
                <label >{quizs.option4}</label>
                <input type="checkbox"  name="options" value={quizs.option4} onChange={this.OptionAnswer.bind(this)}/><br/>
                <br/>
                <div>
                <button type="submit" value="SubmitQuiz"  name="SubmitQuiz" id="SubmitQuiz" >Submit Answer</button>
                </div>
            </div>
           
            )
        })
        return (
            <div>
            {redirectVar}
                <StudentDashboard/>

                <div id="quiz">
                    {details}
                </div>
                
                
            </div>
        );
    }
}

export default Quiz;