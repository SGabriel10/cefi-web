import React, {useEffect,useState}from 'react'
import {useDispatch, useSelector} from "react-redux";
import Pagination from '../ui/Pagination';
import {headerStartLoading} from "../../actions/header";
import {imageStartLoading} from "../../actions/upload";
export const GetEnterprises = () => {
    let results=[];
    const {empresas} = useSelector(state => state.header);
    const dispatch = useDispatch();
    const [search, setSearch]= useState("")
    const [currentPage, setCurrentPage] =useState(1);
    const [userPerPage]=useState(5);

    const indexLastUser = currentPage* userPerPage;
    const indexOfFirstUser = indexLastUser - userPerPage;
    const currentUsers= empresas.slice(indexOfFirstUser,indexLastUser);


    useEffect(() => {
        dispatch(headerStartLoading());
    }, [dispatch]);

    const handleActive=()=>{

    }
    const handleUpdate=(client)=>{
        //dispatch(clientSetActive(client));
    }

    const handleDelete=(client)=>{
        //dispatch(clientDeleted(client))
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
        results= empresas.filter((x)=>
            x.name.toLowerCase().includes(search.toLowerCase()) || x.ruc.toLowerCase().includes(search.toLowerCase())
        )
    }
    return (
        <div>
            <div className="col-5">
                <input value={search} onChange={handleSearch} type="text" placeholder="Buscar Empresa" className="mb-3 form-control"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">EMPRESA</th>
                    <th scope="col">PROPIETARIO</th>
                    <th scope="col">RUC</th>
                    <th scope="col">LOGO</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    results.map((x, key) =>{
                            return (
                                <tr key={x.ruc}>
                                    <th scope="row">{key+1}</th>
                                    <td>{x.nombre}</td>
                                    <td>{x.propietario}</td>
                                    <td>{x.ruc}</td>
                                    <td>
                                        <img src={x.file.url} style={{width: '50px',height: '50px'}}/>
                                    </td>
                                    <td>
                                        <button onClick={()=>handleActive(x)} className="btn btn-success"><i class="fa fa-check"></i></button>
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
            <Pagination pagePerPage={userPerPage} totalPost={empresas.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}
