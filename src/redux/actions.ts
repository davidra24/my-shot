import { ICoctail, IDrink, IOrder } from '../models/coctails.model';
import { UserModel } from '../models/user.model';
import {
  SET_COCTAILS,
  SET_DRINKS,
  SET_MY_ORDERS,
  SET_ALL_ORDERS,
  SET_USER
} from './constants';

export const setUserAction = (payload?: UserModel) => ({
  type: SET_USER,
  payload
});

export const setCoctailsAction = (payload?: Array<ICoctail>) => ({
  type: SET_COCTAILS,
  payload
});

export const setDrinksAction = (payload?: Array<IDrink>) => ({
  type: SET_DRINKS,
  payload
});

export const setMyOrdersActions = (payload?: Array<IOrder>) => ({
  type: SET_MY_ORDERS,
  payload
});

export const setAllOrdersActions = (payload?: Array<IOrder>) => ({
  type: SET_ALL_ORDERS,
  payload
});
