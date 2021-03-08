import {SET_PRODUCT, FETCH_PRODUCT} from '../constants/product';
  
  
  export function setProduct(payload){
    return { type: SET_PRODUCT, payload }
  }
  
  
  export function fetchProduct(payload){
    return { type: FETCH_PRODUCT, payload }
  }
  
  
  