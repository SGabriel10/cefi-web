import {fetchConToken, fetchSinToken} from "../helpers/fetch";
import {types} from "../types/types";
import Swal from "sweetalert2";

export const startLogin = (email,password)=>{
    return async (dispatch)=>{
        const resp = await fetchSinToken('auth',{email, password},'POST');
        const body = await resp.json();

        if (body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else {
            if(body.msg===undefined){
                Swal.fire('Error',body.errors.email.msg,'error');
            }else{
                Swal.fire('Error',body.msg,'error');
            }
        }
    }
}

export const startRegister=(email,password,name,lastName)=>{
    return async (dispatch)=>{
        const resp = await fetchSinToken('users/new',{name,lastName,email, password},'POST');
        const body = await resp.json();
        console.log(body);
        if (body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else {
            Swal.fire('Error',body.msg,'error');
        }
    }
}

export const startChecking= ()=>{
    return async (dispatch)=>{
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        if (body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else {
            Swal.fire('Error',body.msg,'error');
            dispatch(chekingFinish());
        }
    }
}

const chekingFinish = ()=>({
    type:types.authCheckingFinish
})

const login = (user)=>({
    type: types.authLogin,
    payload: user
});

export const startLogout= ()=>{
    return(dispatch)=>{
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = ()=>({ type: types.authLogout});