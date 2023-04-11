import axios from "axios";
import Swal from "sweetalert2";
import {types} from "../types/types";

export const clientCreate = (client)=>{
    return async(dispatch)=>{
        try{
            const {data}= await axios.post('http://localhost:4000/cefi_api/clients/new',client);

            if(data.ok){
                dispatch(clientNew(client));
                Swal.fire('Cliente Creado',data.msg,'success');
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}

const clientNew=(client)=>({
    type: types.clientAddNew,
    payload: client
});


export const clientStartLoading = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get('http://localhost:4000/cefi_api/clients/');
            const {clientes} = data
            dispatch(clientLoaded(clientes));
        }catch (error){
            console.log(error);
        }
    }
}

const clientLoaded = (client) =>({
    type: types.clientLoad,
    payload: client
});

export const clientClearActive = ()=>({
    type: types.clientClearActive
})

export const clientSetActive =(client)=>({
    type: types.clientActive,
    payload: client
})

export const clientUpdated =(client)=>{
    return async (dispatch)=>{
        try{
            console.log(client);
            const resp = await axios.put(`http://localhost:4000/cefi_api/clients/${client._id}`, client);
            const {data}= resp;
            if(data.ok){
                Swal.fire("Categoria actualizada", data.msg, "success");
                dispatch(clientUpdate(client));
            }
            //console.log(resp);
        }catch (error){
            console.log(error);
        }
    }
}

const clientUpdate=(client)=>({
    type: types.clientUpdate,
    payload: client
})


export const clientDeleted =(client)=>{
    return async(dispatch)=>{
        try{
            const {data} = await axios.delete(`http://localhost:4000/cefi_api/clients/${client._id}`)
            if(data.ok){
                Swal.fire('Cliente Borrado', data.msg, 'success');
                dispatch(clientDelete(client));
            }
        }catch (error){
            console.log(error);
        }
    }
}

const clientDelete=(client)=>({
    type: types.clientDelete,
    payload: client
})