import { Size, Topping } from './../constants/common';
export enum Sizes {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large'
}

export enum Toppings {
  Olives = 'Olives',
  Pepperoni = 'Pepperoni',
  Mushrooms = 'Mushrooms',
  Pepper = 'Pepper'
}

export type State = {
  user: {
    username: string;
    phone: string;
  },
  recipe: Recipe;
}

export type Recipe = {
  base: Size;
  toppings: Topping[];
}