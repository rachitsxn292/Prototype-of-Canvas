import {combineReducers} from 'redux';
import authUser from './authUser';
import signUser from './signUser';
import updaUser from './updaUser';
import updeUser from './updeUser';


const rootReducer= combineReducers({
    auth: authUser,
    sign: signUser,
    upda: updaUser,
    upde: updeUser
});


export default rootReducer;