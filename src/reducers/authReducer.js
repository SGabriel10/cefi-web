import {types} from "../types/types";

const initialState={
    logged: false,
    //uid: null,
    //name: null
}

export const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.authLogin:
            return {
                ...state,
                logged: true,
                ...action.payload
            }
        case types.authCheckingFinish:
            return {
                ...state,
                logged: false
            }
        case types.authLogout:
            return {
                logged: false
            }
        default:
            return state;
    }
}