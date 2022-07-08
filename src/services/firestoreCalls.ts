import { throws } from 'assert';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore';
import { errorAlert } from '../components/alerts';
import { firebaseApp } from '../firebase';
import { IDrink } from '../models/coctails.model';

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
