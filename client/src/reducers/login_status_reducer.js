import types from '../actions/types';

const DEFAULT_STATE = {
    login_status: false
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.LOGIN_STATUS:
            return { login_status : action.payload};
        default:
            return state;
    }
}