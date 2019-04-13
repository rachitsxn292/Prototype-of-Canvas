import {setUpdateDetails} from '../Actions/index';

export default function (state=[],action)
{
    switch(action.type)
    {
        case UPDATEDETAILS:
            return action.payload.user;
    }
    return state;
}