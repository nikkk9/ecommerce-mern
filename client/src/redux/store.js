import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer, productsReducer } from "./reducers/product-reducer";
import { userReducer } from "./reducers/user-reducer";

const reducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  user: userReducer,
});

let initialState = {};

const middleware = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
