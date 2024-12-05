import axios from "axios";
import {types} from "../types/types";
export const calcularIngresosLoading = (fechaInicio,fechaFin)=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get(`http://localhost:4000/cefi_api/balance/sumarIngresos/${fechaInicio}/${fechaFin}`);
            const {resultado} = data
           if(data.ok){
                dispatch(entradas(resultado[0].total));
           }else{
                dispatch(entradas(data.total));
           }
        }catch (error){
            console.log(error);
        }
    }
}
export const calcularEgresosLoading = (fechaInicio,fechaFin)=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get(`http://localhost:4000/cefi_api/balance/sumarEgresos/${fechaInicio}/${fechaFin}`);
            const {resultado} = data
            if(data.ok){
                dispatch(salidas(resultado[0].total));
            }
            else{
                dispatch(salidas(data.total));
            }
            //console.log(resultado);
            //dispatch(entryLoaded(ingresos));
        }catch (error){
            console.log(error);
        }
    }
}

export const entradas =(entrada)=>({
    type: types.entradaLoad,
    payload: entrada
})
export const salidas =(salida)=>({
    type: types.salidaLoad,
    payload: salida
});
