import { Size, SIZES, Topping } from "../../constants/common";
import { Sizes, Toppings } from "../../Types/common";


interface Action {
  type: ActionTypes;
  payload?: any;
}

interface State {
  base: Size;
  toppings: Topping[]
}

const initState = {
  base: SIZES[1],
  toppings: []
}

export enum ActionTypes {
  SET_BASE = 'SET_BASE',
  SET_TOPPING = 'SET_TOPPING',
  RESET = 'RESET',
  REMOVE_TOPPING = 'REMOVE_TOPPING'
}

export default function recipe(state: State = { ...initState }, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_BASE:
      return {
        ...state,
        base: action.payload,
      };

    case ActionTypes.SET_TOPPING:
      const nextToppings = [...state.toppings];
      const indexToRemove = nextToppings.findIndex(item => item.label === action.payload?.label);
      if (indexToRemove != -1) {
        nextToppings.splice(indexToRemove, 1);
      } else {
        nextToppings.push(action.payload);
      }
      return {
        ...state,
        toppings: nextToppings
      }

    default:
      return state;
  }
}