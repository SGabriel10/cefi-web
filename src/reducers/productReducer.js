import {types} from "../types/types";
const initialState = {
    products: []
}
export const productReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.productLoad:
            return {
                ...state,
                products: [...action.payload]
            }
        case types.productActive:
            return {
                ...state,
                activeProduct: action.payload
            }
        case types.productClearActive:
            return{
                ...state,
                activeProduct: null
            }
        case types.productAddNew:
            return {
                ...state,
                products: [...state.categories,action.payload]
            }
        case types.productUpdate:
            return {
                ...state,
                products: state.categories.map(x => (x._id === action.payload._id)? action.payload : x )
            }
        case types.productDelete:
            return{
                ...state,
                products: state.categories.filter(x=> x._id!==action.payload._id)
            }
        default:
            return state;
    }
}