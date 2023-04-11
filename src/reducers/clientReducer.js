import {types} from "../types/types";
const initialState = {
    clients: []
}
export const clientReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.clientLoad:
            return {
                ...state,
                clients: [...action.payload]
            }
        case types.clientActive:
            return {
                ...state,
                activeClient: action.payload
            }
        case types.clientClearActive:
            return{
                ...state,
                activeClient: null
            }
        case types.clientAddNew:
            return {
                ...state,
                clients: [...state.clients,action.payload]
            }
        case types.clientUpdate:
            return {
                ...state,
                clients: state.clients.map(x => (x._id === action.payload._id)? action.payload : x )
            }
        case types.clientDelete:
            return{
                ...state,
                clients: state.clients.filter(x=> x._id!==action.payload._id)
            }
        default:
            return state;
    }
}