import {types} from "../types/types";
const initialState = {
    entrada: {total: 0},
    salida: {total: 0},
    diferencia: {total: 0},
}
export const balanceReducer=(state= initialState,action)=>{
    console.log(state,action);
    switch (action.type){
        case types.entradaLoad:
            return {
                ...state,
                entrada: {total: action.payload},
                diferencia: { total: action.payload - state.salida.total }
            }
        case types.salidaLoad:
            return {
                ...state,
                salida: {total: action.payload},
                diferencia: { total: state.entrada.total - action.payload }
            }
        default:
            return state;
    }
}