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
        case types.userAddNew:
            return {
                ...state,
                users: [...state.users,action.payload]
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