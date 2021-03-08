import {FIX_CURRENCY, SWITCH_VIEW, CLEAR_NOTIFY} from '../constants/index';
  
  
export function fixCurrency(payload){
  return { type: FIX_CURRENCY, payload }
}
  
export function switchView(payload){
    return { type: SWITCH_VIEW, payload }
}

export function clearNotify(payload){
    return { type: CLEAR_NOTIFY, payload }
}
