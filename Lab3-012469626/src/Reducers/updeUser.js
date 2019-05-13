import {UPDE} from '../Actions/index';

export default function(state={},action)
{
    switch(action.type)
    {
        case UPDE:
            return action.payload;
        default:
            return state;

    }
    
}