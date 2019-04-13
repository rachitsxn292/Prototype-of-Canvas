import {setSignUpDetails} from '../Actions/index';

export default function (state=[],action)
{
    switch(action.type)
    {
        case SIGNUPDETAILS:
            return action.payload.user;
    }
    return state;
}