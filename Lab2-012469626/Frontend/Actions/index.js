import axios from 'axios';
import Axios from 'axios';

export const AUTH='AUTH';
export const SIGN='SIGN';
export const UPDA='UPDA';
export const UPDE='UPDE';
export const DETAILS='DETAILS';
export const SIGNUPDETAILS='SIGNUPDETAILS';
export const UPDATEDETAILS='UPDATEDETAILS';

export function authUser(){
    return {
        type:AUTH,
        payload:'true'
    };
}

export function signUser(){
    return {
        type:SIGN,
        payload:'User has been sucessfully signed up'
    };
}


export function fetchDetails(email){
    return function(dispatch){
        return Axios.get('http://ec2-18-188-117-8.us-east-2.compute.amazonaws.com:3001/getProfile',{params:{email}})
            .then((res)=>{
                console.log(res.data);
                dispatch(updaUser(res.data));
            });
        };
}

function updaUser(res){
        return {
            type:UPDA,
            payload:res
        };
}
 export function updeUser(res){
    return {
        type:UPDE,
        payload:res
    };
}
export function setDetails(details){
    return{
        type:DETAILS,
        payload:
        {
            user:[{id:details.id,pwd:details.pwd}]
        }
    };

}
    export function setSignUpDetails(details){
        return{
            type:SIGNUPDETAILS,
            payload:
            {
                user:[{name:details.name,email:details.email,password:details.password,role:details.role}]
            }
        };
}

export function setUpdateDetails(details){
    return{
        type:UPDATEDETAILS,
        payload:
        {
            user:[{email: details.email,sid: details.sid,phoneno:details.phoneno,address:details.address,city: details.city,country: details.country,company:details.company,school:details.school,hometown:details.hometown,gender:details.gender,languages:details.languages,aboutme:details.aboutme}]
        }
    };
}