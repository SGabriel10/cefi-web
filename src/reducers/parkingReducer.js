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
                cars: [...state.cars,action.payload]
        }
        case types.carActive:
            return {
                ...state,
                activeCar: action.payload
            }
        case types.carClearActive:
            return{
                ...state,
                activeCar: null
            }
        default:
            return state;
    }
}