import React, {useEffect} from 'react';
import BalanceDetails from './BalanceDetails';

const Balance = () => {

    return (
        <div className="content-wrapper">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-10">
                            <h4>Balance</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <BalanceDetails/>
                </div>
            </div>
        </div>
    );
};

export default Balance;
