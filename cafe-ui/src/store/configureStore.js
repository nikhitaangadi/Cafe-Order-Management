import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import userReducer from "../reducers/userReducer";
import storeReducer from "../reducers/storeReducer";
import modalReducer from "../reducers/modalReducer";
import categoryReducer from "../reducers/categoryReducer";
import itemReducer from "../reducers/itemReducer";
import homeReducer from "../reducers/homeReducer";
import orderReducer from "../reducers/orderReducer";

const configureStore=()=>{
    const store=createStore(combineReducers({
        user:userReducer,
        store:storeReducer,
        modal:modalReducer,
        category:categoryReducer,
        item:itemReducer,
        home:homeReducer,
        order:orderReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore