import {SET_CART} from  "../constants/cart";


const initialState = {
    cart:[],
};

function reducer(state = initialState, action) {
  switch (action.type){
    case SET_CART:
        return Object.assign({}, state, {
           cart: action.payload,
        });
  }
  return state;
}

export default reducer;
