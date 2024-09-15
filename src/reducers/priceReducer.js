import {types} from "../types/types";
const initialState = {
    prices: []
}
export const priceReducer=(state= initialState,action)=>{
    //console.log(action);
    switch (action.type){
        case types.priceLoad:
            return {
                ...state,
                prices: [...action.payload]
            }
        case types.priceActive:
            return {
                ...state,
                activePrice: action.payload
            }
        case types.priceClearActive:
            return{
                ...state,
                activePrice: null
            }
        case types.priceAddNew:
            return {
                ...state,
                prices: [...state.prices,action.payload]
            }
        case types.priceUpdate:
            return {
                ...state,
                prices: state.prices.map(x => (x._id === action.payload._id)? action.payload : x )
            }
        case types.priceDelete:
            return{
                ...state,
                prices: state.prices.filter(x=> x._id!==action.payload._id)
            }
        default:
            return state;
    }
}