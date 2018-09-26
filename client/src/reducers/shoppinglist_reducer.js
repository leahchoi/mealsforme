import types from '../actions/types';

const DEFAULT_STATE = {
    shoppingList: []
};
 function shoppingList(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.ADD_TO_SHOPPINGLIST:
            let list = [...state.shoppingList, action.payload];
            if(state.shoppingList.includes(action.payload)){
                return state;
            };
            return {...state, shoppingList: list};
        case types.REMOVE_FROM_SHOPPINGLIST:
            const index = state.shoppingList.indexOf(action.payload);
            let newList = [...state.shoppingList];
            newList.splice(index, 1);
            return {...state, shoppingList: newList};
        default:
            return state;
    }
}

export default shoppingList;