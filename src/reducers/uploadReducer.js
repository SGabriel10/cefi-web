import {types} from "../types/types";
const initialState = {
    file: null
}
export const uploadReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.uploadAddNew:
            return {
                ...state,
                file: [state.file,action.payload]
            }
        default:
            return state;
    }
}