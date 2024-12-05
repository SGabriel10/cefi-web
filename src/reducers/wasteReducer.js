import {types} from "../types/types";
const initialState = {
    wastes: []
}
export const wasteReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.wasteLoad:
            return {
                ...state,
                wastes: [...action.payload]
            }
        case types.wasteActive:
            return {
                ...state,
                activeWaste: action.payload
            }
        case types.wasteClearActive:
            return{
                ...state,
                activeWaste: null
            }
        case types.wasteAddNew:
            return {
                ...state,
                wastes: [...state.wastes,action.payload]
            }
        case types.wasteUpdate:
            return {
                ...state,
                wastes: state.wastes.map(x => (x._id === action.payload._id)? action.payload : x )
            }
        case types.wasteDelete:
            return{
                ...state,
                wastes: state.wastes.filter(x=> x._id!==action.payload._id)
            }
        default:
            return state;
    }
}