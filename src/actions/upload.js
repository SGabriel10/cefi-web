import axios from 'axios';
import Swal from "sweetalert2";
import { types } from '../types/types';

export const uploadCreate=(datos)=>{
    return async(dispatch)=>{
        try{
            const {empresa, file}= datos;
            const formData = new FormData();
            formData.append('file', file);
            const {data}= await axios.post('http://localhost:4000/cefi_api/upload/new',[formData,file]);    
            if(data.ok){
                dispatch(fileNew(file));
                Swal.fire('Archivo Creada',data.msg,'success');
            }else{
                Swal.fire('Error', "No nada que archivar", 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}
const fileNew=(file)=>({
    type: types.uploadAddNew,
    payload: file
});
