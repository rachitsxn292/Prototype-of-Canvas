import {SIGN} from '../Actions/index';

export default function(state=null,action)
{
    switch(action.type)
    {
        case SIGN:
            return action.payload;

    }
    return state;
}