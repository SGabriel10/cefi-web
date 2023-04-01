import axios from "axios";
import Swal from "sweetalert2";
import {types} from "../types/types";

export const categoryCreate = (category)=>{
    return async(dispatch)=>{
        try{
            const {data}= await axios.post('http://localhost:4000/cefi_api/categories/new',category);

            if(data.ok){
                dispatch(categoryNew(category));
                Swal.fire('Categoria Creada',data.msg,'success');
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        }catch (error){
            console.log(error);
        }
    }
}

const categoryNew=(category)=>({
    type: types.categoryAddNew,
    payload: category
});


export const categoryStartLoading = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await axios.get('http://localhost:4000/cefi_api/categories/');
            const {categorias} = data
            dispatch(categoryLoaded(categorias));
        }catch (error){
            console.log(error);
        }
    }
}

const categoryLoaded = (categories) =>({
    type: types.categoryLoad,
    payload: categories
});

export const categoryClearActive = ()=>({
    type: types.categoryClearActive
})

export const categorySetActive =(category)=>({
    type: types.categoryActive,
    payload: category
})

export const categoryUpdated =(category)=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.put(`http://localhost:4000/cefi_api/categories/${category._id}`, category);
            const {data}= resp;
            if(data.ok){
                Swal.fire("Categoria actualizada", data.msg, "success");
                dispatch(categoryUpdate(category));
            }
            //console.log(resp);
        }catch (error){
            console.log(error);
        }
    }
}

const categoryUpdate=(category)=>({
    type: types.categoryUpdate,
    payload: category
})


export const categoryDeleted =(category)=>{
    return async(dispatch)=>{
        try{
            const {data} = await axios.delete(`http://localhost:4000/cefi_api/categories/${category._id}`)
            if(data.ok){
                Swal.fire('Categoria Borrada', data.msg, 'success');
                dispatch(categoryDelete(category));
            }
        }catch (error){
            console.log(error);
        }
    }
}

const categoryDelete=(category)=>({
    type: types.categoryDelete,
    payload: category
})