import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {uiReducer} from "./uiReducer";
import {categoryReducer} from "./categoryReducer";
import {productReducer} from "./productReducer";
import {clientReducer} from "./clientReducer";
import {saleReducer} from "./saleReducer";
import {authReducer} from "./authReducer";
import { priceReducer } from "./priceReducer";
import { parkingReducer } from "./parkingReducer";
import { uploadReducer } from "./uploadReducer";
import { headerReducer } from "./headerReducer";
import { entryReducer } from "./entryReducer";
import { wasteReducer } from "./wasteReducer";
import { balanceReducer } from "./balanceReducer";

export const rootReducer = combineReducers(
    {
        user: userReducer,
        ui: uiReducer,
        parking: parkingReducer,
        category: categoryReducer,
        product: productReducer,
        client: clientReducer,
        sale: saleReducer,
        price: priceReducer,
        auth: authReducer,
        archivo: uploadReducer,
        header: headerReducer,
        entry: entryReducer,
        waste: wasteReducer,
        balance: balanceReducer
    }
)