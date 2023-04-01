import {types} from "../types/types";
const initialState = {
    categories: []
}
export const categoryReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.categoryLoad:
            return {
                ...state,
                categories: [...action.payload]
            }
        case types.categoryActive:
            return {
                ...state,
                activeCategory: action.payload
            }
        case types.categoryClearActive:
            return{
                ...state,
                activeCategory: null
            }
        case types.categoryAddNew:
            return {
                ...state,
                categories: [...state.categories,action.payload]
            }
        case types.categoryUpdate:
            return {
                ...state,
                categories: state.categories.map(x => (x._id === action.payload._id)? action.payload : x )
            }
        case types.categoryDelete:
            return{
                ...state,
                categories: state.categories.filter(x=> x._id!==action.payload._id)
            }
        default:
            return state;
    }
}