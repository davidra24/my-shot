import {
  ActionModel,
  ActionTypes,
  StateModel,
  StateReducerModel
} from '../models/redux.model';
import { SET_LOADING } from './constants';

export const initialState: StateReducerModel = {
  isLoading: false
};

export const reducer = (
  state: StateReducerModel = initialState,
  action: ActionModel<string, ActionTypes>
) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
      break;
    default:
      return state;
  }
};
