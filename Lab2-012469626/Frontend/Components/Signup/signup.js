import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {signUser} from '../../Actions/index';
import {setSignUpDetails} from '../../Actions/index';


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
        // event.preventDefault();
        this.setState({
            signup: event.target.value
        })
    axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/signup', {
            Name: this.state.nameS,
            Email: this.state.emailS,
            Password:this.state.pwdS,
            Role:this.state.role
        })
        .then(response=>{
            this.props.signUser(data);
            console.log("Data Inserted");
            const data = {
                name: this.props.nameS,
                email: this.state.emailS,
                password:this.state.pwdS,
                role:this.state.role
            }
            // this.props.history.push('/'); //FOR GOINB BACK TO MAIN PAGE AFTER CLICKING ON SIGN
        
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
                        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  id="email" name="email" value={this.state.emailS} onChange={this.email.bind(this)} placeholder="Enter your email" required />
                    </div>
                    <div >
                        <input type="password" id="password" name="password" value={this.state.pwdS} onChange={this.pwd.bind(this)} placeholder="Enter new password" required />
                    </div>
                    <div id="radioSignUp">
                    <input type="radio" name="role" value="S" onChange={this.roleChangeHandler.bind(this)} required/><label>Student</label>
    
                    <input type="radio" name="role" value="F" onChange={this.roleChangeHandler.bind(this)} required /><label>Faculty</label>
                    </div>
                    <div>
                    <button  type="submit" value="submit" onClick={this.SubmitData.bind(this)} name="SignIN" id="SignIN" >
                    Submit</button>
                    <p style={{WebkitTextFillColor:"red"}}> {this.props.sign}</p>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state)
{
    return{
        sign: state.sign,
    }

}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({signUser: signUser,setSignUpDetails:setSignUpDetails}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);