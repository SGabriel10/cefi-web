import { types } from "../types/types";
import axios from "axios";
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

const headerLoaded = (header) =>({
    type: types.headerLoad,
    payload: header
});