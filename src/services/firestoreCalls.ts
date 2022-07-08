import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore';
import { errorAlert, successAlert } from '../components/alerts';
import { firebaseApp } from '../firebase';
import { ICoctail, IDrink } from '../models/coctails.model';
import { convertOzToMl } from '../utils/units';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const callDrinks = async () => {
  try {
    const drinksRef = collection(firestore, 'drinks');
    const docsDrinks = await getDocs(drinksRef);
    const documents: Array<IDrink> = [];
    docsDrinks.forEach((doc) => {
      const obj = { ...doc.data(), uid: doc.id } as IDrink;
      documents.push(obj);
    });
    return documents;
  } catch (error) {
    throw error;
  }
};

export const updateDrink = async (uid: string, drink: IDrink) => {
  try {
    const docuRef = doc(firestore, `drinks/${uid}`);
    await setDoc(docuRef, { ...drink });
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (
  coctail: ICoctail,
  drinks?: Array<IDrink>
) => {
  try {
    const ordersRef = collection(firestore, 'orders');
    const documentRef = doc(ordersRef);
    await setDoc(documentRef, {
      userId: auth.currentUser?.uid,
      userEmail: auth.currentUser?.email,
      coctailId: coctail.uid,
      coctailName: coctail.name,
      active: true
    });
    coctail.ingredients.forEach(async (ingredient) => {
      const finded = drinks?.find((drink) => drink.uid === ingredient.id);
      if (finded) {
        const available =
          Number(finded.available) - Number(convertOzToMl(ingredient.measure));
        console.log(ingredient.name, available);

        const drink = {
          ...finded,
          available
        };
        await updateDrink(ingredient.id, drink);
      }
    });
  } catch (error) {
    throw error;
  }
};
