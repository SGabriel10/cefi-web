import {types} from "../types/types";


export const saleDetailsStartLoading=()=>{

}
 export const saleDetaillsNew = (details)=>({
   type: types.saleAddDetails,
   payload: details
 });