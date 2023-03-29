import {types} from "../types/types";
const initialState = {
    users: []
}
export const userReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.userLoad:
            return {
                ...state,
                users: [...action.payload]
            }
        case types.userActive:
            return {
                ...state,
                activeUser: action.payload
            }
        case types.userClearActive:
            return{
                ...state,
                activeUser: null
            }
        case types.userAddNew:
            return {
                ...state,
                users: [...state.users,action.payload]
            }
        case types.userUpdate:
            return {
                ...state,
                users: state.users.map(x => (x._id === action.payload._id)? action.payload : x )
            }
        case types.userDelete:
            return{
                ...state,
                users: state.users.filter(x=> x._id!==action.payload._id)
            }
        default:
            return state;
    }
}