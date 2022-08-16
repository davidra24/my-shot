import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase';
import { REGEX_EMAIL } from '../utils';
import { DEFAULT, EXISTING_EMAIL, WEAK_PASSWORD } from '../utils/constants';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const resetPasswordService = async (email: string) => {
  if (REGEX_EMAIL.test(email)) {
    await sendPasswordResetEmail(auth, email);
  } else {
    throw new Error('Not match');
  }
};

export const loginService = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerService = async (email: string, password: string) => {
  const infoUsuario = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const docuRef = doc(firestore, `users/${infoUsuario.user.uid}`);
  return await setDoc(docuRef, { email, role: 'default' });
};
