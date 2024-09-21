import axios from "axios";
import Swal from "sweetalert2";
import {types} from "../types/types";

export const carCreate = (car)=>{
    return async(dispatch)=>{
        try{
            const {data}= await axios.post('http://localhost:4000/cefi_api/parking/new',car);
            console.log(car);
            if(data.ok){
                dispatch(carNew(car));
                Swal.fire('Hora calculada',data.msg,'success');
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}

const carNew=(detail)=>({
    type: types.carAddDetails,
    payload: detail
});

export const carStartLoading = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get('http://localhost:4000/cefi_api/parking/');
            const {carros} = data
            dispatch(carLoaded(carros));
        }catch (error){
            console.log(error);
        }
    }
}

const carLoaded = (car) =>({
   type: types.carLoad,
    payload: car
}
);
export const carUpdated =(car)=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.put(`http://localhost:4000/cefi_api/parking/${car._id}`, car);
            const {data}= resp;
            if(data.ok){
                Swal.fire("Carro actualizado", data.msg, "success");
                dispatch(carUpdate(car));
            }
        }catch (error){
            console.log(error);
        }
    }
}


export const carSetActive =(car)=>({
    type: types.carActive,
    payload: car
})

const carUpdate=(price)=>({
    type: types.priceUpdate,
    payload: price
})

export const carClearActive = ()=>({
    type: types.priceClearActive
})
