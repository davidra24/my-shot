import { useSelector } from 'react-redux';
import { StateModel } from '../models/redux.model';

export const useUserIsAdmin = () => {
  const user = useSelector((state: StateModel) => state.reducer.user);
  return user?.role === 'admin';
};
