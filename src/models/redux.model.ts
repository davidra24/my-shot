import {
  setAllOrdersActions,
  setCoctailsAction,
  setDrinksAction,
  setMyOrdersActions,
  setUserAction
} from '../redux/actions';
import { ICoctail, IDrink, IOrder } from './coctails.model';
import { UserModel } from './user.model';

export interface StateReducerModel {
  user?: UserModel;
  coctails: Array<ICoctail>;
  drinks: Array<IDrink>;
  myOrders: Array<IOrder>;
  allOrders: Array<IOrder>;
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
  | typeof setCoctailsAction
  | typeof setMyOrdersActions
  | typeof setAllOrdersActions;

export type ActionTypes = ReturnType<ACTION_TYPE>;
