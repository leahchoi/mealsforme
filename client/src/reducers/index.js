import { combineReducers } from 'redux';
import searchRecipe from './search_reducer';
import userLoginResponse from './login_reducer';
import login_status from './login_status_reducer';
import { reducer as formReducer } from 'redux-form';
import shoppingList from './shoppinglist_reducer';
import favorites from './favorite_reducer';
import pageReducer from './page_no_reducer';

const rootReducer = combineReducers({
    search: searchRecipe,
    userLoginResponse: userLoginResponse,
    login_status: login_status,
    logout: userLoginResponse,
    form: formReducer,
    shoppingList: shoppingList,
    favorites: favorites,
    page: pageReducer

});

export default rootReducer;