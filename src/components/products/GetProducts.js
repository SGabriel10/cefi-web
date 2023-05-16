import React, {useEffect,useState}from 'react'
import {useDispatch, useSelector} from "react-redux";
import {uiOpenModal} from "../../actions/ui";
import {productDeleted, productSetActive, productStartLoading} from "../../actions/product";
import Pagination from "../ui/Pagination";

const GetProducts = () => {
    let results=[];
    const {products} = useSelector(state => state.product)
    const dispatch = useDispatch();
    const [search, setSearch]= useState("")
    const [currentPage, setCurrentPage] =useState(1);
    const [userPerPage]=useState(5);

    const indexLastUser = currentPage* userPerPage;
    const indexOfFirstUser = indexLastUser - userPerPage;
    const currentCategories= products.slice(indexOfFirstUser,indexLastUser);


    useEffect(() => {
        dispatch(productStartLoading());
    }, [dispatch]);


    const handleUpdate=(product)=>{
        dispatch(uiOpenModal());
        dispatch(productSetActive(product));
    }

    const handleDelete=(product)=>{
        dispatch(productDeleted(product))
    }

    const paginate =(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }

    if(!search){
        results= currentCategories
    }else{
        results= products.filter((x)=>
            x.descripcion.toLowerCase().includes(search.toLowerCase())
        )
    }
    return (
        <div>
            <div className="col-5">
                <input value={search} onChange={handleSearch} type="text" placeholder="Buscar Producto" className="mb-3 form-control"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">descripcion</th>
                    <th scope="col">Precio unitario</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    results.map((x, key) =>{
                            return (
                                <tr key={x._id}>
                                    <th scope="row">{key+1}</th>
                                    <td>{x.descripcion}</td>
                                    <td>{x.precio_unitario}</td>
                                    <td>{x.categoria.descripcion}</td>
                                    <td>
                                        <button onClick={()=>handleUpdate(x)} className="btn btn-info"><i className="fa fa-edit"></i></button>
                                        <button onClick={()=>handleDelete(x)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            );
                        }
                    )
                }
                </tbody>
            </table>
            <Pagination pagePerPage={userPerPage} totalPost={products.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}
export default GetProducts;
