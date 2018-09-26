import types from '../actions/types';

const DEFAULT_STATE = {
    page: 0
};

export default function pageReducer(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.SET_PAGE_NO:
            return {page: action.payload};
        default:
            return state;
    }
}