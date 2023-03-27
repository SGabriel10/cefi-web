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
                Swal.fire('Mensaje',data.msg,'success');
            }
        }catch (error){
            console.log(error);
        }
    }
}

const userNew=(event)=>({
    type: types.userAddNew,
    payload: event
});

export const userDeleted =(user)=>{
    return async(dispatch)=>{
        try{
            const {data} = await axios.delete(`http://localhost:4000/cefi_api/users/${user._id}`)
            if(data.ok){
                //Swal.fire('Usuario Borrado', data.msg, 'success');
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