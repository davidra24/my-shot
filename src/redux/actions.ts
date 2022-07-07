import { SET_LOADING } from './constants';

export const setLoadingAction = (payload: boolean) => ({
  type: SET_LOADING,
  payload
});
