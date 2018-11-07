import types from '../actions/types';

const DEFAULT_STATE = {
    shoppingList: [],
    shoppingListServer: []
};
 function shoppingList(state=DEFAULT_STATE, action){
     if(action.error){
         return {state};
     }

    switch(action.type){
        case types.ADD_TO_SHOPPINGLIST:
            let list = [...state.shoppingList, action.payload];
            if(state.shoppingList.includes(action.payload)){
                return state;
            };
            return {...state, shoppingList: list};
        case types.ADD_SHOPPINGLIST_SER:
            list =  action.payload.data.data;
            return {...state, shoppingListServer: list};
        case types.REMOVE_FROM_SHOPPINGLIST:
            const index = state.shoppingList.indexOf(action.payload);
            let newList = [...state.shoppingList];
            newList.splice(index, 1);
            return {...state, shoppingList: newList};
        case types.GET_SHOPPINGLIST_SER:
            let shoplist = '';
            if(action.payload.data.data){
                shoplist = action.payload.data.data;
            }
            return {...state, shoppingListServer: shoplist};
        case types.DEL_SHOPPINGLIST_SER:
            list = action.payload.data.data;
            return {...state, shoppingListServer: list};
        case types.STATUS_SHOPPING:
            list = action.payload.data.data;
            return {...state, shoppingListServer: list};
        default:
            return state;
    }
}

export default shoppingList;