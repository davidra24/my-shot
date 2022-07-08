export interface IIngredient {
  id: string;
  name: string;
  measure: number;
  units: string;
}

export interface ICoctail {
  uid: string;
  name: string;
  ingredients: Array<IIngredient>;
  image: string;
}

export interface IDrink {
  uid: string;
  name: string;
  image: string;
  available: number;
}

export interface IOrder {
  uid: string;
  coctail: string;
  user: string;
  active: boolean;
}
