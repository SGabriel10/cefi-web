import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {uiReducer} from "./uiReducer";
import {categoryReducer} from "./categoryReducer";
import {productReducer} from "./productReducer";

export const rootReducer = combineReducers(
    {
        user: userReducer,
        ui: uiReducer,
        category: categoryReducer,
        product: productReducer
    }
)