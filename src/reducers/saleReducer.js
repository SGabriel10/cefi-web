import {types} from "../types/types";
const initialState = {
    details: [],
    total: 0
}
export const saleReducer=(state= initialState,action)=>{
    switch (action.type){
        case types.saleAddDetails:
            return {
                ...state,
                details: [...state.details,action.payload]
            }
        case types.saleDeleteDetails:
            return{
                ...state,
                details: state.details.filter(x=> x.product._id!==action.payload.product._id),
                total: state.total - ((action.payload.product.precio_unitario)*action.payload.cantidad)
            }
        case types.saleCalculateTotal:
            return {
                ...state,
                total: state.total+action.payload
            }
        case types.saleClearDetails:
            return {
                ...state,
                details: [],
                total: 0
            }
        default:
            return state;
    }
}