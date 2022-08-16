import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useInputValue } from '../hooks/useInput';
import '../styles/login.css';
import { Loader } from '../components/Loader';
import { errorAlert, successAlert, warningAlert } from '../components/alerts';
import {
  loginService,
  registerService,
  resetPasswordService
} from '../services/login.services';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const email = useInputValue('');
  const password = useInputValue('');

  const resetPassword = async () => {
    try {
      await resetPasswordService(email.value);
      password.setDefaultValue();
      successAlert(
        'Reestablecimiento',
        'Se ha enviado un correo para su cambio de contraseña [Revisa el Spam]'
      );
    } catch (error) {
      warningAlert('Advertencia', 'No ha ingresado un correo valido en la app');
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginService(email.value, password.value);
    } catch (error) {
      setIsLoading(false);
      return errorAlert('Error', 'No se ha podido loggear en My Shot');
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      await registerService(email.value, password.value);
    } catch (error: any) {
      setIsLoading(false);
      switch (error.code) {
        case 'auth/weak-password':
          return errorAlert(
            'Error',
            'La contraseña debe tener mínimo 6 caracteres'
          );
        case 'auth/email-already-in-use':
          return errorAlert('Error', 'Ese e-mail ya está registrado');
        default:
          return errorAlert('Error', 'No se ha podido registrar en My Shot');
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
            onChange={(e) => email.onChange(e)}
          />
        </Form.Group>
        <Form.Group className='login__container'>
          <Form.Label className='form-label'>Contraseña</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password.value}
            onChange={(e) => password.onChange(e)}
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
