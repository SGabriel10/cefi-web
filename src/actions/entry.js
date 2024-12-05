import axios from "axios";
import Swal from "sweetalert2";
import {types} from "../types/types";

export const entryCreate = (entry)=>{
    return async(dispatch)=>{
        try{
            const {data}= await axios.post('http://localhost:4000/cefi_api/entries/new',entry);

            if(data.ok){
                dispatch(entryNew(entry));
                Swal.fire('Ingreso Creado',data.msg,'success');
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}

const entryNew=(entry)=>({
    type: types.entryAddNew,
    payload: entry
});


export const entryStartLoading = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get('http://localhost:4000/cefi_api/entries/');
            const {ingresos} = data
            dispatch(entryLoaded(ingresos));
        }catch (error){
            console.log(error);
        }
    }
}

const entryLoaded = (entry) =>({
    type: types.entryLoad,
    payload: entry
});

export const entryClearActive = ()=>({
    type: types.entryClearActive
})

export const entrySetActive =(entry)=>({
    type: types.entryActive,
    payload: entry
})

export const entryUpdated =(entry)=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.put(`http://localhost:4000/cefi_api/entries/${entry._id}`, entry);
            const {data}= resp;
            if(data.ok){
                Swal.fire("Ingreso actualizado", data.msg, "success");
                dispatch(entryUpdate(entry));
            }
            //console.log(resp);
        }catch (error){
            console.log(error);
        }
    }
}

const entryUpdate=(entry)=>({
    type: types.entryUpdate,
    payload: entry
})


export const entryDeleted =(entry)=>{
    return async(dispatch)=>{
        try{
            const {data} = await axios.delete(`http://localhost:4000/cefi_api/entries/${entry._id}`)
            if(data.ok){
                Swal.fire('Ingreso Borrado', data.msg, 'success');
                dispatch(entryDelete(entry));
            }
        }catch (error){
            console.log(error);
        }
    }
}

const entryDelete=(entry)=>({
    type: types.entryDelete,
    payload: entry
})