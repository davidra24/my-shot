import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore';
import { firebaseApp } from '../firebase';
import { ICoctail, IDrink, IOrder } from '../models/coctails.model';
import { convertOzToMl } from '../utils';
import { updateDrink } from './drinks.services';

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const user = auth.currentUser;

export const createOrder = async (
  coctail: ICoctail,
  drinks?: Array<IDrink>
) => {
  const ordersRef = collection(firestore, 'orders');
  const documentRef = doc(ordersRef);
  await setDoc(documentRef, {
    userId: user?.uid,
    userEmail: user?.email,
    coctailId: coctail.uid,
    coctailName: coctail.name,
    active: true
  });
  coctail.ingredients.forEach(async (ingredient) => {
    const finded = drinks?.find((drink) => drink.uid === ingredient.id);
    if (finded) {
      const available =
        Number(finded.available) - Number(convertOzToMl(ingredient.measure));
      const drink = {
        ...finded,
        available
      };
      await updateDrink(ingredient.id, drink);
    }
  });
};

export const getOrdersByUser = async () => {
  const ordersRef = collection(firestore, 'orders');
  const docsDrinks = await getDocs(ordersRef);
  const documents: Array<IOrder> = [];
  docsDrinks.forEach((order) => {
    const finded = order.data().userId === user?.uid;
    if (finded) {
      const obj = { ...order.data(), uid: order.id } as IOrder;
      documents.push(obj);
    }
  });
  return documents;
};

export const getAllOrdersService = async () => {
  const coctailsRef = collection(firestore, 'coctails');
  const docsOrders = await getDocs(coctailsRef);
  const documents: Array<IOrder> = [];
  docsOrders.forEach((doc) => {
    const obj = { ...doc.data(), uid: doc.id } as IOrder;
    documents.push(obj);
  });
  return documents;
};
