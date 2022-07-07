import { useInputValue } from '../hooks/useInput';
import { firebaseApp } from '../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  Firestore
} from 'firebase/firestore';
import '../styles/login.css';
import { useState } from 'react';
import { Loader } from '../components/Loader';
import { errorAlert } from '../components/alerts';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const email = useInputValue('');
  const password = useInputValue('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      setIsLoading(false);
    } catch (error) {
      errorAlert('Error', 'No se ha podido loggear en My Shot');
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const docuRef = await doc(firestore, `users/${infoUsuario.user.uid}`);
      await setDoc(docuRef, {
        email: email.value,
        role: 'default'
      });
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.message);

      setIsLoading(false);
      switch (error.code) {
        case 'auth/weak-password':
          errorAlert(
            'Error',
            'La contraseña debe tener mínimo 6 caracteres para registrar en My Shot'
          );
          break;
        case 'auth/email-already-in-use':
          errorAlert('Error', 'Ese e-mail ya está registrado en My Shot');
          break;
        default:
          errorAlert('Error', 'No se ha podido registrar en My Shot');
          break;
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <form className='login__container' onSubmit={handleLogin}>
        <label htmlFor='exampleFormControlInput1' className='form-label'>
          Correo electrónico
        </label>
        <input
          type='email'
          className='form-control form-control-lg'
          id='exampleFormControlInput1'
          placeholder='name@example.com'
          value={email.value}
          onChange={email.onChange}
        />
        <label htmlFor='exampleFormControlTextarea1' className='form-label'>
          Contraseña
        </label>
        <input
          type='password'
          className='form-control form-control-lg'
          id='inputPassword'
          value={password.value}
          onChange={password.onChange}
        />
        <button type='submit' className='btn btn-primary btn-lg button__login'>
          Iniciar Sesión
        </button>
        <button
          type='button'
          className='btn btn-outline-light button__login'
          onClick={handleRegister}
        >
          Registrarse
        </button>
      </form>
    </>
  );
};
