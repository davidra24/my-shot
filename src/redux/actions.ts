import { ICoctail, IDrink } from '../models/coctails.model';
import { UserModel } from '../models/user.model';
import { SET_COCTAILS, SET_DRINKS, SET_USER } from './constants';

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
