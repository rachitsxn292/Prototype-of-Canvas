import {DETAILS} from '../Actions/index';

export default function (state=[],action)
{
    switch(action.type)
    {
        case DETAILS:
            return action.payload.user;
    }
    return state;
}