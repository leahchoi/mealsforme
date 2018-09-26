import types from '../actions/types';

const DEFAULT_STATE = {
    userLoginResponse: '',
    signup: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.LOGIN:
            if(!action.payload.data){
                return state;
            }
            localStorage.userInfo = JSON.stringify(action.payload.data);
            return { userLoginResponse: action.payload};
        case types.USER_LOGOUT:
            localStorage.removeItem('userInfo');
            return { userLoginResponse: { userLoginResponse: false }};
        case types.SIGN_UP:
            return { ...state, signup: action.payload }
        default:
            return state;
    }
}