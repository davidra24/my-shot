import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore';
import { firebaseApp } from '../firebase';
import { IDrink } from '../models/coctails.model';

const firestore = getFirestore(firebaseApp);

export const callDrinks = async () => {
  const drinksRef = collection(firestore, 'drinks');
  const docsDrinks = await getDocs(drinksRef);
  console.log({ docsDrinks });

  const documents: Array<IDrink> = [];
  docsDrinks.forEach((doc) => {
    const obj = { ...doc.data(), uid: doc.id } as IDrink;
    documents.push(obj);
  });
  console.log({ documents });

  return documents;
};

export const createDrink = async (name: string, image: string) => {
  const drinksRef = collection(firestore, 'drinks');
  const documentRef = doc(drinksRef);
  return await setDoc(documentRef, { name, image });
};

export const updateDrink = async (uid: string, drink: IDrink) => {
  const docuRef = doc(firestore, `drinks/${uid}`);
  return await setDoc(docuRef, { ...drink });
};
