import React, {useEffect} from 'react';
import {uiOpenModal} from "../../actions/ui";
import {useDispatch} from "react-redux";
import AddPrice from './AddPrice';
import GetPrices from './GetPrices';

const Price = () => {

    const dispatch = useDispatch();
/*    useEffect(() => {
        //console.log("?");
        dispatch(categoryStartLoading());
    }, [dispatch,categoryStartLoading]);
*/
    const handleModal=()=>{
        dispatch(uiOpenModal());
    }

    return (
        <div className="content-wrapper">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-10">
                            <h4>Precios</h4>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-sm float-end" onClick={handleModal}>Agregar Precio</button>
                        </div>

                    </div>
                </div>
                <div className="card-body">
                    <GetPrices/>
                </div>
            </div>
            <AddPrice/>
        </div>
    );
};

export default Price;
