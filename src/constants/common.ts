import { Toppings, Sizes } from "../Types/common";

export type Size = {
  label: Sizes;
  price: number;
}

export const SIZES = [
  {
    label: Sizes.Small,
    price: 15
  },
  {
    label: Sizes.Medium,
    price: 20
  },
  {
    label: Sizes.Large,
    price: 25
  }
];

export type Topping = {
  label: Toppings;
  price: number;
}

export const TOPPINGS = [
  {
    label: Toppings.Olives,
    price: 3
  },
  {
    label: Toppings.Pepperoni,
    price: 4
  },
  {
    label: Toppings.Mushrooms,
    price: 2
  },
  {
    label: Toppings.Pepper,
    price: 2
  }
]