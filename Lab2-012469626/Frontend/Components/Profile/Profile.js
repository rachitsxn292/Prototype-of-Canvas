import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import StudentDashboard from '../../StudentDashboard/StudentDashboard';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {fetchDetails} from '../../Actions/index';
import {setUpdateDetails} from '../../Actions/index';
import {updeUser} from '../../Actions/index';
class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            email: cookie.load('email'),
            sid:'',
            phoneno:'',
            address:'',
            city:'',
            country:'',
            company:'',
            school:'',
            hometown:'',
            gender:'',
            languages:'',
            aboutme:'',
            picture:'',
            selectedFile: null, 
            fileView:[],
            file: '',
            imglink:''
        }
        this.onChange = this.onChange.bind(this);
    }
    SidUpdate(event){
        this.setState({
            sid:event.target.value
        })
    }
    PhoneUpdate(event){
        this.setState({
            phoneno:event.target.value
        })
    }
    AddressUpdate(event){
        this.setState({
            address:event.target.value
        })
    }
    CityUpdate(event){
        this.setState({
            city:event.target.value
        })
    }
    CountryUpdate(event){
        this.setState({
            country:event.target.value
        })
    }
    CompanyUpdate(event){
        this.setState({
            company:event.target.value
        })
    }
    SchoolUpdate(event){
        this.setState({
            school:event.target.value
        })
    }
    HometownUpdate(event){
        this.setState({
            hometown:event.target.value
        })
    }
    GenderUpdate(event){
        this.setState({
            gender:event.target.value
        })
    }
    LanguageUpdate(event){
        this.setState({
            languages:event.target.value
        })
    }
    AboutmeUpdate(event){
        this.setState({
            aboutme:event.target.value
        })
    }
    onChange(event){
        this.setState({
            selectedFile: event.target.files[0],
            imglink: URL.createObjectURL(event.target.files[0])
        })

    }
    UpdateProfileData(event)
    { 
        const {email,sid,phoneno,address,city,country,company,school,hometown,gender,languages,aboutme} = this.state;
        axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/updateprofile', {email,sid,phoneno,address,city,country,company,school,hometown,gender,languages,aboutme})
        .then(response=>{
            const data = {
                email: this.props.email,
                sid: this.state.sid,
                phoneno:this.state.phoneno,
                address:this.state.address,
                city: this.props.city,
                country: this.state.country,
                company:this.state.company,
                school:this.state.school,
                hometown:this.state.hometown,
                gender:this.state.gender,
                languages:this.state.languages,
                aboutme:this.state.aboutme

            }
            this.props.updeUser(data);
                if(response.data==="true")
                {
                    alert("Profile Updated");
                }

    })
    };
    // componentDidMount(){
    //     const {email} = this.state;
    //     axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/getProfile', {params: {email}})
    //     .then(res => {
    //         console.log(res.data);
    //         res.data.map(item => {
    //         this.setState({
                
    //                 sid:item.SID,
    //                 phoneno:item.PHONENO,
    //                 address:item.ADDRESS,
    //                 city:item.CITY,
    //                 picture:item.picture,
    //                 country:item.COUNTRY,
    //                 company:item.COMPANY,
    //                 school:item.SCHOOL,
    //                 hometown:item.HOMETOWN,
    //                 gender:item.GENDER,
    //                 languages:item.LANGUAGES,
    //                 aboutme:item.ABOUTME,
    //         })
    //         });
    //     })
    // } 

    componentDidMount(){
        const {email} = this.state;
        this.props.upda.map(item => {
            this.setState({
                
                    sid:item.sid,
                    phoneno:item.phoneno,
                    address:item.address,
                    city:item.city,
                    picture:item.picture,
                    country:item.country,
                    company:item.company,
                    school:item.school,
                    hometown:item.hometown,
                    gender:item.gender,
                    languages:item.languages,
                    aboutme:item.aboutme})
            });
    } 


    UploadDp(){
        const {email}=this.state;
        const data = new FormData()
        data.set('email', email);
        data.append('file', this.state.selectedFile, this.state.selectedFile.filename)
        axios.post('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/uploadPicture',data,{email})
        .then(res=>{
            const {imglink} = this.state;
            this.setState({
                picture: imglink
            })
            alert("Picture Uploaded");
        })

    }
    render() {
        let redirectVar=null;
        if(!(cookie.load('email'))){
            redirectVar=<Redirect to='/'/>
        }
        return (
            <div>
            {redirectVar}
            <StudentDashboard/>
                <div id="updateProfilePage">
                <h2>Update Your Profile</h2><br/><br/><br/><br/>
                <div>
                <img src={this.state.picture} alt="Profile Picture" width="80" height="80" id="DisplayPicture"></img>
                <input type="file" id="uploadDp" name="Dp" onChange={this.onChange} />
                <button value="SubmitUploadPic" id="DpLabel"  onClick={this.UploadDp.bind(this)}>Upload Picture</button>
                </div><br/> <br/>
                <div>
                <input type="text" id="sidu" name="sid" value={this.state.sid} onChange={this.SidUpdate.bind(this)} placeholder="Enter Student ID" />
                </div>
                <div>
                <input type="text" id="phoneno" name="phoneno" value={this.state.phoneno} onChange={this.PhoneUpdate.bind(this)} placeholder="Enter Your PhoneNo" />
                </div>
                <div>
                <input type="text" id="addressu" name="address" value={this.state.address} onChange={this.AddressUpdate.bind(this)} placeholder="Enter Your Address" />
                </div>
                <div>
                <input type="text" id="cityu" name="city" value={this.state.city} onChange={this.CityUpdate.bind(this)} placeholder="Enter Your City" />
                </div>
                <div>
                <input type="text" id="countryu" name="country" value={this.state.country} onChange={this.CountryUpdate.bind(this)} placeholder="Enter Your Country" />
                </div>
                <div>
                <input type="text" id="companyu" name="company" value={this.state.company} onChange={this.CompanyUpdate.bind(this)} placeholder="Enter Your Company" />
                </div>
                <div>
                <input type="text" id="schoolu" name="school" value={this.state.school} onChange={this.SchoolUpdate.bind(this)} placeholder="Enter Your School" />
                </div>
                <div>
                <input type="text" id="homwtownu" name="hometown" value={this.state.hometown} onChange={this.HometownUpdate.bind(this)} placeholder="Enter Your Hometown" />
                </div>
                <div>
                <input type="text" id="genderu" name="gender" value={this.state.gender} onChange={this.GenderUpdate.bind(this)} placeholder="Enter Your Gender" />
                </div>
                <div>
                <input type="text" id="languageu" name="language" value={this.state.languages} onChange={this.LanguageUpdate.bind(this)} placeholder="Enter Your Languages" />
                </div>
                <div>
                <input type="text" id="aboutmeu" name="aboutme" value={this.state.aboutme} onChange={this.AboutmeUpdate.bind(this)} placeholder="Enter Your Desciption" />
                </div>
                <div>
                    <button type="submit"  value="UpdateProfile" onClick={this.UpdateProfileData.bind(this)}  name="UpdateProfile" id="UpdateProfile" >
                    Update Profile</button>
                </div>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return{
        upda:state.upda,
        upde: state.upde
    }

}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({fetchDetails: fetchDetails,setUpdateDetails:setUpdateDetails,updeUser:updeUser}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);