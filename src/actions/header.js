import { types } from "../types/types";
import axios from "axios";
import Swal from "sweetalert2";
export const checkActiveHeader=()=>{
    return async(dispatch)=>{
        try{
            const {data}= await axios.get('http://localhost:4000/cefi_api/header/check');
            console.log(data);
            dispatch(headerActive(data.cab));
        }catch(error){
            console.log(error);
        }
    }    
}
export const headerSetActive=(empresa)=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.put(`http://localhost:4000/cefi_api/header/active/${empresa._id}`,empresa);
            if(data.ok){
                Swal.fire('Se ha activado la empresa','Empresa activada correctamente','success');
                dispatch(headerActive(data.cab));
            }else{
                Swal.error('Error',data.msg,'error');
            }
        }catch(error){
            console.log(error);
        }
    }
}
export const headerStartLoading = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get('http://localhost:4000/cefi_api/header/');
            const {cab} = data
            dispatch(headerLoaded(cab));
        }catch (error){
            console.log(error);
        }
    }
}
const headerActive=(header)=>({
    type: types.headerActive,
    payload: header
});

const headerLoaded = (header) =>({
    type: types.headerLoad,
    payload: header
});
