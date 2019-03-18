import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';


class Signup extends Component{

    constructor(props)
    {
        super(props);
        {
            this.state={
                nameS:'',
                emailS:'',
                pwdS:'',
                signup:'',
                role:''
            }
        }
    }
    name(event){
        this.setState({
            nameS:event.target.value
        })
    }
    email(event){
        this.setState({
            emailS:event.target.value
        })
    }
    roleChangeHandler(event){
        this.setState({
            role:event.target.value
        })
    }
    pwd(event){
        this.setState({
            pwdS:event.target.value
        })
    }
    SubmitData(event){
        this.setState({
            signup: event.target.value
        })
    axios.post('http://localhost:3001/signup', {
            Name: this.state.nameS,
            Email: this.state.emailS,
            Password:this.state.pwdS,
            Role:this.state.role
        })
        .then(response=>{
            console.log("Data Inserted");
            this.props.history.push('/'); //FOR GOINB BACK TO MAIN PAGE AFTER CLICKING ON SIGN
        
    });
    } 
    render()
    {
        return(
            <div>
            <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7" alt="Logo" className="loginlogo" /><br/>
                    <div>
                        <input type="text" id="name" name="name" value={this.state.nameS} onChange={this.name.bind(this)} placeholder="Enter your name" />
                    </div>
                    <div >
                        <input type="email"  id="email"name="email" value={this.state.emailS} onChange={this.email.bind(this)} placeholder="Enter your email" />
                    </div>
                    <div >
                        <input type="password" id="password" name="password" value={this.state.pwdS} onChange={this.pwd.bind(this)} placeholder="Enter new password" />
                    </div>
                    <div id="radioSignUp">
                    <input type="radio" name="role" value="S" onChange={this.roleChangeHandler.bind(this)} required /><label>Student</label>
    
                    <input type="radio" name="role" value="F" onChange={this.roleChangeHandler.bind(this)} required /><label>Faculty</label>
                    </div>
                    <div>
                    <button type="submit" value="submit" onClick={this.SubmitData.bind(this)} name="SignIN" id="SignIN" >
                    Submit</button>
                </div>
            </div>
        )
    }
}


export default Signup;