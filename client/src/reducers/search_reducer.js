import types from '../actions/types';
import React from "react";

const DEFAULT_STATE = {
    ingredients: [],
    searched_recipe: [],
    searched_recipe_null: false,
    details: '',
};

function  searchResult(state = DEFAULT_STATE, action){
    switch (action.type) {
        case types.ADD_INGREDIENT:
            let prevIngredients = [...state.ingredients];
            if(prevIngredients.includes(action.payload)){
                return state;
            }
            let ingredients = [ ...state.ingredients, action.payload ];
            return { ...state, ingredients };
        case types.REMOVE_INGREDIENT:
            ingredients = [...state.ingredients];
            ingredients.splice(action.payload, 1);
            return { ...state, ingredients};
        case types.CLEAR_USER_INGREDIENT_INPUTS:
            return {...state, ingredients: []};
        case types.SEARCHED_RECIPE:
            if(Array.isArray(action.payload.data)){
                console.log('not_null:', action.payload);
                return { ...state, searched_recipe: [ ...state.searched_recipe, ...action.payload.data]};
            } else if(action.payload.data === null){
                return { ...state, searched_recipe_null: true};
            }
        case types.DETAILS_PAGE:
            return { ...state, details: action.payload};
        case types.CLEAR_SEARCHED_RECIPE:
            return {...state, searched_recipe: []};
        case types.INVALID_SEARCH:
            console.log('setting:', action.payload);
            return { ...state, searched_recipe_null: action.payload};
        default:
            return state;
    }
}

export default searchResult;
