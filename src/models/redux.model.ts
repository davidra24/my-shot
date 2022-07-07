import {
  setCoctailsAction,
  setDrinksAction,
  setUserAction
} from '../redux/actions';
import { ICoctail, IDrink } from './coctails.model';
import { UserModel } from './user.model';

export interface StateReducerModel {
  user?: UserModel;
  coctails?: Array<ICoctail>;
  drinks?: Array<IDrink>;
}

export interface StateModel {
  reducer: StateReducerModel;
}

export interface ActionModel<T, P> {
  readonly type: T;
  readonly payload?: P;
}

type ACTION_TYPE =
  | typeof setUserAction
  | typeof setDrinksAction
  | typeof setCoctailsAction;

export type ActionTypes = ReturnType<ACTION_TYPE>;
