import React from 'react';

const Pagination = ({userPerPage,totalPost, paginate,paginateNext, paginatePrevius}) => {
    const pageNumber=[];
    for(let i = 1; i<= Math.ceil(totalPost/userPerPage);i++){
        pageNumber.push(i);
    }
    return (
        <nav className="pagination justify-content-center">
            <li className="page-item disabled">
                <a className="page-link" tabIndex="-1">Anterior</a>
            </li>
            {pageNumber.map(number =>(
                <li key={number} className="page-item">
                  <a onClick={()=>paginate(number)}  className="page-link">
                          {number} <span className="sr-only">(current)</span>
                  </a>
                </li>
                ))}
            <li className="page-item">
                <a className="page-link">Siguiente</a>
            </li>

        </nav>
    );
};

export default Pagination;
