 import {UPDA} from '../Actions/index';

 export default function(state={},action)
 {
     switch(action.type)
     {
         case UPDA:
             return action.payload;
         default:
             return state;
 
     }
     
 }