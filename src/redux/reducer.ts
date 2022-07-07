import {
  ActionModel,
  ActionTypes,
  StateReducerModel
} from '../models/redux.model';
import { SET_COCTAILS, SET_DRINKS, SET_USER } from './constants';

export const initialState: StateReducerModel = {
  user: undefined,
  coctails: undefined,
  drinks: undefined
};

export const reducer = (
  state: StateReducerModel = initialState,
  action: ActionModel<string, ActionTypes>
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_DRINKS:
      return {
        ...state,
        drinks: action.payload
      };
    case SET_COCTAILS:
      return {
        ...state,
        coctails: action.payload
      };
    default:
      return state;
  }
};
