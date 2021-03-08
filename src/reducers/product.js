import {FETCH_PRODUCT} from  "../constants/product";


const initialState = {
    products:[],
    product:{
      
    }
};

function reducer(state = initialState, action) {
  switch (action.type){
    case FETCH_PRODUCT:
        return Object.assign({}, state, {
           products: action.payload,
        });
  }
  return state;
}

export default reducer;
