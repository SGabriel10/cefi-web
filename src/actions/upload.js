import axios from 'axios';
import Swal from "sweetalert2";
import { types } from '../types/types';

export const fileCreate = (file)=>{
    return async(dispatch)=>{
        try{
            const formData = new FormData();
            formData.append('file', file);
            const {data} = await axios.post('http://localhost:4000/cefi_api/upload/new',formData);
            if(data.ok){
                //Swal.fire('Se subio el archivo',data.msg,'success');
                dispatch(fileAddNew(data.id));
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const headerCreate=(header,file)=>{
    return async(dispatch)=>{
        try{
            dispatch(fileCreate(file));
            const {data}= await axios.post('http://localhost:4000/cefi_api/header/new',{header, archivo: file});    
            if(data.ok){
                Swal.fire('Empresa Creada',data.msg,'success');
            }else{
                Swal.fire('Error', "No nada que archivar", 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}
export const fileAddNew = (id)=>({
    type: types.uploadAddNew,
    payload: id
  });
