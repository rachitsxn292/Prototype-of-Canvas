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
import { withApollo } from 'react-apollo';

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
        
        this.props.query.logInQuery({
            variables: {
                email: this.state.email,
                password: this.state.password,
                role: this.state.role
            }
        }).then(result => {
            console.log(result.data);
            if (result.data.Signin !== true) {
                this.setState({
                    invalidMessage: 'Invalid Details. Please try again!'
                })
            }
        })
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


// function mapStateToProps(state)
// {
//     return{
//         auth:state.auth,
//     }

// }

// function mapDispatchToProps(dispatch)
// {
//     return bindActionCreators({authUser: authUser, fetchDetails:fetchDetails, setDetails:setDetails}, dispatch);
// }

export default withApollo(Loginmain);