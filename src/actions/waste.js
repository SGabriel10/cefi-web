import axios from "axios";
import Swal from "sweetalert2";
import {types} from "../types/types";

export const wasteCreate = (waste)=>{
    return async(dispatch)=>{
        try{
            const {data}= await axios.post('http://localhost:4000/cefi_api/wastes/new',waste);

            if(data.ok){
                dispatch(wasteNew(waste));
                Swal.fire('Egreso Creado',data.msg,'success');
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}

const wasteNew=(waste)=>({
    type: types.wasteAddNew,
    payload: waste
});


export const wasteStartLoading = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get('http://localhost:4000/cefi_api/wastes/');
            const {egresos} = data
            dispatch(wasteLoaded(egresos));
        }catch (error){
            console.log(error);
        }
    }
}

const wasteLoaded = (waste) =>({
    type: types.wasteLoad,
    payload: waste
});

export const wasteClearActive = ()=>({
    type: types.wasteClearActive
})

export const wasteSetActive =(waste)=>({
    type: types.wasteActive,
    payload: waste
})

export const wasteUpdated =(waste)=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.put(`http://localhost:4000/cefi_api/wastes/${waste._id}`, waste);
            const {data}= resp;
            if(data.ok){
                Swal.fire("Egreso actualizado", data.msg, "success");
                dispatch(wasteUpdate(waste));
            }
            //console.log(resp);
        }catch (error){
            console.log(error);
        }
    }
}

const wasteUpdate=(waste)=>({
    type: types.wasteUpdate,
    payload: waste
})


export const wasteDeleted =(waste)=>{
    return async(dispatch)=>{
        try{
            const {data} = await axios.delete(`http://localhost:4000/cefi_api/wastes/${waste._id}`)
            if(data.ok){
                Swal.fire('Egreso Borrado', data.msg, 'success');
                dispatch(wasteDelete(waste));
            }
        }catch (error){
            console.log(error);
        }
    }
}

const wasteDelete=(waste)=>({
    type: types.wasteDelete,
    payload: waste
})