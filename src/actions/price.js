import axios from "axios";
import Swal from "sweetalert2";
import {types} from "../types/types";

export const priceCreate = (price)=>{
    return async(dispatch)=>{
        try{
            const {data}= await axios.post('http://localhost:4000/cefi_api/prices/new',price);
            if(data.ok){
                dispatch(priceNew(price));
                Swal.fire('Precio Creado',data.msg,'success');
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}

const priceNew=(price)=>({
    type: types.priceAddNew,
    payload: price
});


export const priceStartLoading = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get('http://localhost:4000/cefi_api/prices/');
            //console.log(data);
            const {precios} = data
            dispatch(priceLoaded(precios));
        }catch (error){
            console.log(error);
        }
    }
}

const priceLoaded = (price) =>({
   type: types.priceLoad,
    payload: price
}
);


export const priceClearActive = ()=>({
    type: types.priceClearActive
})

export const priceSetActive =(price)=>({
    type: types.priceActive,
    payload: price
})

export const priceUpdated =(price)=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.put(`http://localhost:4000/cefi_api/prices/${price._id}`, price);
            const {data}= resp;
            if(data.ok){
                Swal.fire("Precio actualizado", data.msg, "success");
                dispatch(priceUpdate(price));
            }
        }catch (error){
            console.log(error);
        }
    }
}

const priceUpdate=(price)=>({
    type: types.priceUpdate,
    payload: price
})


export const priceDeleted =(price)=>{
    return async(dispatch)=>{
        try{
            const {data} = await axios.delete(`http://localhost:4000/cefi_api/prices/${price._id}`)
            if(data.ok){
                Swal.fire('precio Borrado', data.msg, 'success');
                dispatch(priceDelete(price));
            }
        }catch (error){
            console.log(error);
        }
    }
}

const priceDelete=(price)=>({
    type: types.priceDelete,
    payload: price
})