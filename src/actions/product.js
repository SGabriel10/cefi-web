import axios from "axios";
import Swal from "sweetalert2";
import {types} from "../types/types";

export const productCreate = (product)=>{
    return async(dispatch)=>{
        try{
            console.log(product);
            const {data}= await axios.post('http://localhost:4000/cefi_api/products/new',product);

            if(data.ok){
                dispatch(productNew(product));
                Swal.fire('Producto Creado',data.msg,'success');
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}

const productNew=(product)=>({
    type: types.productAddNew,
    payload: product
});


export const productStartLoading = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get('http://localhost:4000/cefi_api/products/');
            const {productos} = data
            dispatch(categoryLoaded(productos));
        }catch (error){
            console.log(error);
        }
    }
}

const categoryLoaded = (products) =>({
    type: types.productLoad,
    payload: products
});

export const productClearActive = ()=>({
    type: types.productClearActive
})

export const productSetActive =(product)=>({
    type: types.productActive,
    payload: product
})

export const productUpdated =(product)=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.put(`http://localhost:4000/cefi_api/categories/${product._id}`, product);
            const {data}= resp;
            if(data.ok){
                Swal.fire("Categoria actualizada", data.msg, "success");
                dispatch(productUpdate(product));
            }
            //console.log(resp);
        }catch (error){
            console.log(error);
        }
    }
}

const productUpdate=(product)=>({
    type: types.productUpdate,
    payload: product
})


export const productDeleted =(product)=>{
    return async(dispatch)=>{
        try{
            const {data} = await axios.delete(`http://localhost:4000/cefi_api/products/${product._id}`)
            if(data.ok){
                Swal.fire('producto Borrado', data.msg, 'success');
                dispatch(productDelete(product));
            }
        }catch (error){
            console.log(error);
        }
    }
}

const productDelete=(product)=>({
    type: types.productDelete,
    payload: product
})