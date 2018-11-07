import types from '../actions/types';

const DEFAULT_STATE = {
    favorites: [],
};

export default function favorites(state=DEFAULT_STATE, action){
    if(action.error){
        return state;
    }
    switch(action.type){
        case types.ADD_TO_FAVORITE:
            return {...state};
        case types.DELETE_FROM_FAVORITE:
            let recipe_id = action.payload;
            let newList = [...state.favorites];
            let tobeDeletedIndex = '';
            for(var i = 0; i < newList.length; i++){
                if(newList[i].recipe_id == recipe_id){
                    tobeDeletedIndex = i;
                }
            }
            newList.splice(tobeDeletedIndex, 1);
            if(newList.length === 0){
                newList = '';
            }
            console.log('newlist:', newList);
            return {favorites: newList};
        case types.GET_FAVORITE:
            let list = '';
            if(typeof action.payload.data.data !== "undefined"){
                list = [...action.payload.data.data];
            }

            return {...state, favorites: list};
        default:
            return state;
    }
}