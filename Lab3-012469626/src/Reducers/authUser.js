import {AUTH} from '../Actions/index';

export default function(state=null,action)
{
    switch(action.type)
    {
        case AUTH:
            return action.payload;

    }
    return state;
}