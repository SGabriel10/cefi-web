import {types} from "../types/types";
import axios from "axios";
import Swal from "sweetalert2";


export const saleDetailsStartLoading=()=>{

}
export const saleDetailCreate = (id,details)=>{
    return ()=>{
        try{
            details.map(async (detail) => {
                await axios.post('http://localhost:4000/cefi_api/sale_details/new', {detail, venta: id})
            })
        }catch (error){
            console.log(error);
        }
    }
}
export const saleCreate=(sale,details)=>{
        return async(dispatch)=>{
            //console.log(sale);
            try{
                const {data}= await axios.post('http://localhost:4000/cefi_api/sales/new',sale);

                if(!(details.length===0)){
                    dispatch(saleDetailCreate(data.venta._id,details));
                    Swal.fire('Venta Creada',data.msg,'success');
                    dispatch(saleClearDetails());

                }else{
                    Swal.fire('Error', "No nada que vender", 'error');
                }
            }catch (error){
                console.log(error);
            }
        }
}
const saleClearDetails=()=>({
    type: types.saleClearDetails
})

export const saleDetailDelete=(detail)=>({
    type: types.saleDeleteDetails,
    payload: detail
})
export const saleCalculateTotal = (total)=>({
    type: types.saleCalculateTotal,
    payload: total
});

 export const saleDetaillsNew = (details)=>({
   type: types.saleAddDetails,
   payload: details
 });