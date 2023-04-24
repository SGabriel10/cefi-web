import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {uiReducer} from "./uiReducer";
import {categoryReducer} from "./categoryReducer";
import {productReducer} from "./productReducer";
import {clientReducer} from "./clientReducer";
import {saleReducer} from "./saleReducer";
import {authReducer} from "./authReducer";

export const rootReducer = combineReducers(
    {
        user: userReducer,
        ui: uiReducer,
        category: categoryReducer,
        product: productReducer,
        client: clientReducer,
        sale: saleReducer,
        auth: authReducer
    }
)