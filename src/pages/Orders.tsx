import { getAuth } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { firebaseApp } from '../firebase';
import { IOrder } from '../models/coctails.model';
import { StateModel } from '../models/redux.model';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const Orders = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userActive = useSelector((state: StateModel) => state.reducer.user);
  const [orders, setOrders] = useState<Array<IOrder>>([]);

  const callOrders = async () => {
    try {
      const coctailsRef = collection(firestore, 'coctails');
      const docsOrders = await getDocs(coctailsRef);
      const documents: Array<IOrder> = [];
      if (userActive?.role === 'admin') {
        docsOrders.forEach((doc) => {
          const obj = { ...doc.data(), uid: doc.id } as IOrder;
          documents.push(obj);
        });
        setOrders(documents);
      } else {
        docsOrders.forEach((doc) => {
          const { user } = doc.data();
          if (user === userActive?.uid) {
            const obj = { ...doc.data(), uid: doc.id } as IOrder;
            documents.push(obj);
          }
        });
        setOrders(documents);
      }
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    callOrders();
  }, []);

  return <></>;
};
