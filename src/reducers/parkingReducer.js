import {types} from "../types/types";
const initialState = {
    cars: []
}
export const parkingReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.carLoad:
            return {
                ...state,
                cars: [...action.payload]
            }
        case types.carAddDetails:
            return {
                ...state,
                cars: [...state.details,action.payload]
        }
        default:
            return state;
    }
}