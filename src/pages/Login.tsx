import { useInputValue } from '../hooks/useInput';
import { firebaseApp } from '../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
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
import { errorAlert, successAlert, warningAlert } from '../components/alerts';
import { Button, Card, Form } from 'react-bootstrap';
import { REGEX_EMAIL } from '../utils';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const email = useInputValue('');
  const password = useInputValue('');

  const resetPassword = () => {
    try {
      if (REGEX_EMAIL.test(email.value)) {
        password.setDefaultValue();
        sendPasswordResetEmail(auth, email.value);
        successAlert(
          'Reestablecimiento',
          'Se ha enviado un correo para su cambio de contraseña [Revisa el Spam]'
        );
      } else {
        warningAlert(
          'Advertencia',
          'No ha ingresado un correo valido en la app'
        );
      }
    } catch (error) {
      console.log(error);

      warningAlert('Advertencia', 'No ha ingresado un correo valido en la app');
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
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
    } catch (error: any) {
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
      <Form onSubmit={handleLogin}>
        <Form.Group className='login__container' onSubmit={handleLogin}>
          <Form.Label className='form-label'>Correo electrónico</Form.Label>
          <Form.Control
            type='email'
            placeholder='emomipasion@hotmail.com'
            value={email.value}
            onChange={email.onChange}
          />
        </Form.Group>
        <Form.Group className='login__container'>
          <Form.Label className='form-label'>Contraseña</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password.value}
            onChange={password.onChange}
          />
          <Button variant='success' type='submit' className='button__login'>
            Iniciar Sesión
          </Button>
          <Button
            variant='outline-light'
            className='button__login'
            onClick={handleRegister}
          >
            Registrarse
          </Button>
          <Card.Link className='button__forget' onClick={resetPassword}>
            Olvide mi contraseña
          </Card.Link>
        </Form.Group>
      </Form>
    </>
  );
};
