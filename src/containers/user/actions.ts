import { AppDispatch } from './../../store/index';
import { ActionTypes } from "./reducer"

export function setUserInfo(userInfo: { username: string; phone: string; })  {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ActionTypes.SET_USER,
      payload: userInfo
    })
  }
}