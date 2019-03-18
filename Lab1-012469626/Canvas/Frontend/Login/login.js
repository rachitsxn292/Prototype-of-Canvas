import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
class Loginmain extends Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            pwd:'',
            login:''
        }
    }

    SigninData(event)
    {
        
        axios.post('http://localhost:3001/login', {
            id: this.state.id,
            pwd: this.state.pwd,
            login: event.target.value
        })
        .then(response=>{
                var receive = response.data;
                console.log(response.data);
                cookie.save('email', this.state.id);
                if(receive.role === 'F')
                {
                    
                    this.props.history.push('/FacultyDashBoard');
                }
                else if(receive.role==='S')
                {
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
export default Loginmain;