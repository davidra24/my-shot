import { setLoadingAction } from '../redux/actions';

export interface StateReducerModel {
  isLoading: boolean;
}

export interface StateModel {
  reducer: StateReducerModel;
}

export interface ActionModel<T, P> {
  readonly type: T;
  readonly payload?: P;
}

type ACTION_TYPE = typeof setLoadingAction;

export type ActionTypes = ReturnType<ACTION_TYPE>;
