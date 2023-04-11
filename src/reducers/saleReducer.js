import {types} from "../types/types";
const initialState = {
    details: []
}
export const saleReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.saleAddDetails:
            return {
                ...state,
                details: [...state.details,action.payload]
            }
        default:
            return state;
    }
}