import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {authUser} from '../../Actions/index';
import {fetchDetails} from '../../Actions/index';
import {setDetails} from '../../Actions/index';

class Loginmain extends Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            pwd:'',
            login:''
            // auth:''
        }
    }

    SigninData(event)
    {
        
        axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/login', {
            id: this.state.id,
            pwd: this.state.pwd,
            login: event.target.value
        })
        .then(response=>{
                var receive = response.data.result;
                console.log("Data in MongoDB",response.data.result);
                cookie.save('email', this.state.id);
                const email1=cookie.load('email');
                const data = {
                    email: this.props.email,
                    password: this.state.pwd
                }
                localStorage.setItem('authToken', response.data.token);

                if(receive[0].role === 'F')
                {
                    this.props.setDetails(data);
                    this.props.fetchDetails(email1);
                        this.props.history.push('/FacultyDashBoard');
                    
                    
                }
                else if(receive[0].role ==='S')
                {   
                    this.props.setDetails(data);
                    this.props.fetchDetails(email1);
                        this.props.history.push('/StudentDashboard');
                    
                    
                }

    });
    } 

    LoginPwd(event){
        this.setState({
            pwd:event.target.value
        })
    }
    LoginID(event){
        this.setState({
            id:event.target.value
        })
    }
    render()
    {
        
        return(
            <div>
            <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7" alt="Logo" className="loginlogo" /><br/>
                <br/>
                <div className="loginInput">
                    <div >
                        <input type="email" id="login" name="input" value={this.state.id} onChange={this.LoginID.bind(this)} placeholder="Enter Your ID" />
                    </div>
                    <div >
                        <input type="password" id="password" name="password" value={this.state.pwd} onChange={this.LoginPwd.bind(this)} placeholder="Enter Your Password" />
                    </div>
                </div>
                <div>
                    <button type="submit" value="SignIN" onClick={this.SigninData.bind(this)} name="SignIN" id="SignIN" >Sign IN</button>
                </div>
                <div>
                    <button type="submit"  value="SignUP"  name="SignUP" id="SignUP" >
                    <Link to='/signup'>Sign Up</Link></button>
                </div>
            </div>

        )
    }
}


function mapStateToProps(state)
{
    return{
        auth:state.auth,
    }

}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({authUser: authUser, fetchDetails:fetchDetails, setDetails:setDetails}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loginmain);