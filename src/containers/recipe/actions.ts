import { Size } from '../../constants/common';
import { AppDispatch } from './../../store/index';
import { ActionTypes } from "./reducer"

export function setBase(base: Size) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ActionTypes.SET_BASE,
      payload: base
    })
  }
}