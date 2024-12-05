import React, {useEffect,useState}from 'react'
import {useDispatch, useSelector} from "react-redux";
import {uiOpenModal} from "../../actions/ui";
import {wasteDeleted, wasteSetActive, wasteStartLoading} from "../../actions/waste";
import Pagination from "../ui/Pagination";

const GetWastes = () => {
    let results=[];
    const {wastes} = useSelector(state => state.waste)
    const dispatch = useDispatch();
    const [search, setSearch]= useState("")
    const [currentPage, setCurrentPage] =useState(1);
    const [userPerPage]=useState(5);

    const indexLastUser = currentPage* userPerPage;
    const indexOfFirstUser = indexLastUser - userPerPage;
    const currentCategories= wastes.slice(indexOfFirstUser,indexLastUser);


    useEffect(() => {
        dispatch(wasteStartLoading());
    }, [dispatch]);


    const handleUpdate=(waste)=>{
        dispatch(uiOpenModal());
        dispatch(wasteSetActive(waste));
    }

    const handleDelete=(entry)=>{
        dispatch(wasteDeleted(entry))
    }

    const paginate =(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    const parsearFecha=(fecha)=>{
        const timestamp = Date.parse(fecha); // Formato ISO
        const date = new Date(timestamp);
        return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    }

    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }

    if(!search){
        results= currentCategories
    }else{
        results= wastes.filter((x)=>
            x.descripcion.toLowerCase().includes(search.toLowerCase())
        )
    }
    return (
        <div>
            <div className="col-5">
                <input value={search} onChange={handleSearch} type="text" placeholder="Buscar Ingreso" className="mb-3 form-control"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">DESCRIPCION</th>
                    <th scope="col">CANTIDAD</th>
                    <th scope="col">FECHA</th>
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
                                    <td>{x.cantidad}</td>
                                    <td>{parsearFecha(x.fecha)}</td>
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
            <Pagination pagePerPage={userPerPage} totalPost={wastes.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}
export default GetWastes;
