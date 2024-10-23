import {types} from "../types/types";
const initialState = {
    empresas: []
}
export const headerReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.headerLoad:
            return {
                ...state,
                empresas: [...action.payload]
            }
        default:
            return state;
    }
}