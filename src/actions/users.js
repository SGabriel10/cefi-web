import axios from "axios";
import {types} from "../types/types";
import Swal from "sweetalert2";

export const userStartLoading = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get('http://localhost:4000/cefi_api/users/');
            const {usuarios} = data
            dispatch(userLoaded(usuarios));
        }catch (error){
            console.log(error);
        }
    }
}

const userLoaded = (users) =>({
    type: types.userLoad,
    payload: users
});

export const userCreate = (user)=>{
    return async(dispatch)=>{
        try{
            const {data}= await axios.post('http://localhost:4000/cefi_api/users/new',user);

            if(data.ok){
                dispatch(userNew(user));
                Swal.fire('Usuario Creado',data.msg,'success');
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}

const userNew=(user)=>({
    type: types.userAddNew,
    payload: user
});

export const userClearActive = ()=>({
    type: types.userClearActive
})

export const userSetActive =(user)=>({
    type: types.userActive,
    payload: user
})

export const userUpdated =(user)=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.put(`http://localhost:4000/cefi_api/users/${user._id}`, user);
            const {data}= resp;
            if(data.ok){
                Swal.fire("Usuario actualizado", data.msg, "success");
                dispatch(userUpdate(user));
            }
            //console.log(resp);
        }catch (error){
            console.log(error);
        }
    }
}

const userUpdate=(user)=>({
    type: types.userUpdate,
    payload: user
})


export const userDeleted =(user)=>{
    return async(dispatch)=>{
        try{
            const {data} = await axios.delete(`http://localhost:4000/cefi_api/users/${user._id}`)
            if(data.ok){
                Swal.fire('Usuario Borrado', data.msg, 'success');
                dispatch(userDelete(user));
            }
        }catch (error){
            console.log(error);
        }
    }
}

const userDelete=(user)=>({
    type: types.userDelete,
    payload: user
})