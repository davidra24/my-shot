import { collection, getDocs, getFirestore } from 'firebase/firestore';
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
    errorAlert('Error', 'No se han encontrado bebidas');
    return undefined;
  }
};
