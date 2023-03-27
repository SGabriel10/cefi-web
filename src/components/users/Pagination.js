import React from 'react';

const Pagination = ({userPerPage,totalPost, paginate, currentPage, setCurrentPage}) => {
    const pageNumber=[];
    for(let i = 1; i<= Math.ceil(totalPost/userPerPage);i++){
        pageNumber.push(i);
    }

    const nextCurrentPage=()=>{
        setCurrentPage(currentPage+1);
    }

    const prevCurrentPage=()=>{
        setCurrentPage(currentPage-1);
    }

    return (

    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage===1? 'disabled': ''}`}>
                <a onClick={()=>prevCurrentPage()} className="page-link" href="#" tabIndex="-1">Anterior</a>
            </li>
            {pageNumber.map(number =>(
                <li key={number} className={`page-item ${number===currentPage? 'active' : ''}`}>
                    <a onClick={()=>paginate(number)}  className="page-link">
                        {number}
                    </a>
                </li>
            ))}
            <li className={`page-item ${currentPage===pageNumber.length? 'disabled': ''}`}>
                <a onClick={()=>nextCurrentPage()} className="page-link">Siguiente</a>
            </li>
        </ul>
    </nav>
    );
};

export default Pagination;
