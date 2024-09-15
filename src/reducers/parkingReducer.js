import {types} from "../types/types";
const initialState = {
    details: [],
    total: 0,
    hour: 0.0
}
export const parkingReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.carAddDetails:
            return {
                ...state,
                details: [...state.details,action.payload]
            }
        case types.hourCalculateTotal:
            return {
                ...state,
                total: state.total+action.payload
            }
        case types.hourClearDetails:
            return {
                ...state,
                details: [],
                total: 0,
                hour: 0.0
            }
        default:
            return state;
    }
}