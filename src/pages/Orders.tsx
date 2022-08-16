import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { useUserIsAdmin } from '../hooks/useUserIsAdmin';

export const Orders = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userIsAdmin = useUserIsAdmin();

  const callAllOrders = async () => {
    setIsLoading(true);
  };

  useEffect(() => {
    callAllOrders();
  }, []);

  return <>{isLoading ? <Loader /> : <>{}</>}</>;
};
