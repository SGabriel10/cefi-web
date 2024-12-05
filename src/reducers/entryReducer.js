import {types} from "../types/types";
const initialState = {
    entries: []
}
export const entryReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.entryLoad:
            return {
                ...state,
                entries: [...action.payload]
            }
        case types.entryActive:
            return {
                ...state,
                activeEntry: action.payload
            }
        case types.entryClearActive:
            return{
                ...state,
                activeEntry: null
            }
        case types.entryAddNew:
            return {
                ...state,
                entries: [...state.entries,action.payload]
            }
        case types.entryUpdate:
            return {
                ...state,
                entries: state.entries.map(x => (x._id === action.payload._id)? action.payload : x )
            }
        case types.entryDelete:
            return{
                ...state,
                entries: state.entries.filter(x=> x._id!==action.payload._id)
            }
        default:
            return state;
    }
}