import {types} from "../types/types";
const initialState = {
        id: null
}
export const uploadReducer=(state= initialState,action)=>{
    console.log(action);
    switch (action.type){
        case types.uploadAddNew:
            return {
                ...state,
                id: action.payload,
            }
        default:
            return state;
    }
}