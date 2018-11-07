import types from '../actions/types';

const DEFAULT_STATE = {
    userLoginResponse: '',
    signup: '',
    loginError: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.LOGIN:
            let loginStatus = action.payload.data.success;
            if(!action.payload.data){
                return state;
            }
            localStorage.userInfo = JSON.stringify(action.payload.data);
            return { ...state, userLoginResponse: action.payload, loginError: loginStatus};
        case types.USER_LOGOUT:
            localStorage.removeItem('userInfo');
            return { ...state, userLoginResponse: false };
        case types.SIGN_UP:
            return { ...state, signup: action.payload };
        case types.LOGIN_DEFAULT:
            return { ...state, loginError: ''};
        default:
            return state;
    }
}