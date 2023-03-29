import React, {useEffect,useState}from 'react'
import {useDispatch, useSelector} from "react-redux";
import {userDeleted, userSetActive, userStartLoading} from "../../actions/users";
import Pagination from "./Pagination";
import {uiOpenModal} from "../../actions/ui";

export const GetUsers = () => {
    let results=[];
    const {users} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [search, setSearch]= useState("")
    const [currentPage, setCurrentPage] =useState(1);
    const [userPerPage]=useState(5);

    const indexLastUser = currentPage* userPerPage;
    const indexOfFirstUser = indexLastUser - userPerPage;
    const currentUsers= users.slice(indexOfFirstUser,indexLastUser);


    useEffect(() => {
        dispatch(userStartLoading());
    }, [dispatch]);


    const handleUpdate=(user)=>{
        dispatch(uiOpenModal());
        dispatch(userSetActive(user));
    }

    const handleDelete=(user)=>{
        dispatch(userDeleted(user))
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
       results= users.filter((x)=>
            x.name.toLowerCase().includes(search.toLowerCase())
        )
    }
  return (
    <div>
        <div className="col-5">
            <input value={search} onChange={handleSearch} type="text" placeholder="Buscar Usuario" className="mb-3 form-control"/>
        </div>
        <table className="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Correo</th>
        <th scope="col">Acciones</th>
      </tr>
      </thead>
      <tbody>
      {
          results.map((x, key) =>{
              return (
              <tr key={x.email}>
                  <th scope="row">{key+1}</th>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
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
    <Pagination userPerPage={userPerPage} totalPost={users.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}

