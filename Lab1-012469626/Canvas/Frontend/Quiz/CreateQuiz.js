import React, { Component } from 'react';
import FacultyDashBoard from '../FacultyDashboard/FacultyDashboard';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class CreateQuiz extends Component {
    constructor(props){
        super(props)
        {
            this.state={
                courseid:cookie.load('courseid'),
                ques:'',
                op1:'',
                op2:'',
                op3:'',
                op4:'',
                result:''
            }
        }
    }

    QuizQues(event)
    {
        this.setState({
            ques:event.target.value
        })

    }
    OptionOne(event)
    {
        this.setState({
            op1:event.target.value
        })

    }
    OptionTwo(event)
    {
        this.setState({
            op2:event.target.value
        })

    }
    OptionThree(event)
    {
        this.setState({
            op3:event.target.value
        })

    }
    OptionFour(event)
    {
        this.setState({
            op4:event.target.value
        })

    }
    QuizResult(event)
    {
        this.setState({
            result:event.target.value
        })

    }
    QuizData(){
        const {courseid,ques,op1,op2,op3,op4,result} = this.state;
        axios.post('http://localhost:3001/facultyCreateQuiz', {courseid,ques,op1,op2,op3,op4,result})
        .then(response=>{
                alert("Question Created");

    });
    }
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        return (
            <div>
            {redirectVar}
            <FacultyDashBoard/>
                <div  id="QuizCreateBoard">

                <div>
                <input type="text" id="quizQues" name="quizQues" value={this.state.ques} onChange={this.QuizQues.bind(this)} placeholder="Enter Your Question" />
                </div>
                <div>
                <input type="text" id="option1" name="option1" value={this.state.op1} onChange={this.OptionOne.bind(this)} placeholder="Enter Option1" />
                </div>
                <div>
                <input type="text" id="option2" name="option2" value={this.state.op2} onChange={this.OptionTwo.bind(this)} placeholder="Enter Option2" />
                </div>
                <div>
                <input type="text" id="option3" name="option3" value={this.state.op3} onChange={this.OptionThree.bind(this)} placeholder="Enter Option3" />
                </div>
                <div>
                <input type="text" id="option4" name="option4" value={this.state.op4} onChange={this.OptionFour.bind(this)} placeholder="Enter Option4" />
                </div>
                <div>
                <input type="text" id="resultQuiz" name="resultQuiz" value={this.state.result} onChange={this.QuizResult.bind(this)} placeholder="Enter Result to be Matched" />
                </div>
                
                <div>
                <button type="submit" value="CreateQuiz"  id="CreateQuiz" onClick={this.QuizData.bind(this)} >Create Question</button>
                </div>

                </div>
                    
            </div>
        );
    }
}

export default CreateQuiz;