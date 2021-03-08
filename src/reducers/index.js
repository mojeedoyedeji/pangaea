import {combineReducers} from "redux";
import {INITIALIZE, FIX_CURRENCY} from  "../constants/index";

import productReducer from './product';
import cartReducer from './cart';


const initialState = {
  loading: false,
  notify:{
    message: "",
    status: "",
  },
  page: 2,
  currency: 'NGN'
};

function mainReducer(state = initialState, action) {
  switch (action.type){
    case INITIALIZE:
      return Object.assign({}, state, {
         loading: false,
         loggedIn: false,
       });
    case FIX_CURRENCY:
      return Object.assign({}, state, {
        currency: action.payload
      });
  }
  return state;
}

const rootReducer = combineReducers({
    main: mainReducer,
    products: productReducer,
    cart: cartReducer,
});

export default rootReducer;
