import React, {useEffect,useState}from 'react'
import {useDispatch, useSelector} from "react-redux";
import Pagination from '../ui/Pagination';
import {uiOpenModal} from "../../actions/ui";
import {clientDeleted, clientSetActive, clientStartLoading} from "../../actions/client";

export const GetClients = () => {
    let results=[];
    const {clients} = useSelector(state => state.client)
    const dispatch = useDispatch();
    const [search, setSearch]= useState("")
    const [currentPage, setCurrentPage] =useState(1);
    const [userPerPage]=useState(5);

    const indexLastUser = currentPage* userPerPage;
    const indexOfFirstUser = indexLastUser - userPerPage;
    const currentUsers= clients.slice(indexOfFirstUser,indexLastUser);


    useEffect(() => {
        dispatch(clientStartLoading());
    }, [dispatch]);


    const handleUpdate=(client)=>{
        dispatch(uiOpenModal());
        dispatch(clientSetActive(client));
    }

    const handleDelete=(client)=>{
        dispatch(clientDeleted(client))
    }

    const paginate =(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }

    if(!search){
        results= currentUsers
    }else{
        results= clients.filter((x)=>
            x.name.toLowerCase().includes(search.toLowerCase()) || x.ruc.toLowerCase().includes(search.toLowerCase())
        )
    }
    return (
        <div>
            <div className="col-5">
                <input value={search} onChange={handleSearch} type="text" placeholder="Buscar Cliente" className="mb-3 form-control"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">RUC</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    results.map((x, key) =>{
                            return (
                                <tr key={x.ruc}>
                                    <th scope="row">{key+1}</th>
                                    <td>{x.name}</td>
                                    <td>{x.last_name}</td>
                                    <td>{x.ruc}</td>
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
            <Pagination pagePerPage={userPerPage} totalPost={clients.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}

