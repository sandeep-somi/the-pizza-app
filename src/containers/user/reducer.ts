

interface Action {
  type: ActionTypes;
  payload?: any;
}

interface State {
  username: string;
  phone: string;
}

const initState = {
  username: '',
  phone: ''
}

export enum ActionTypes {
  SET_USER = 'SET_USER',
  RESET_USER = 'RESET_USER'
}

export default function user(state: State = { ...initState }, action: Action) {
  switch(action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        username: action.payload.username,
        phone: action.payload.phone
      };

    case ActionTypes.RESET_USER:
      return {
        ...state,
        username: '',
        phone: ''
      }

    default:
      return state;
  }
}