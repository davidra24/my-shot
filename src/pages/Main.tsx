import { MouseEventHandler } from 'react';
import { DefaultUser } from '../components/DefaultUser';
import { UserModel } from '../models/user.model';
import '../styles/main.css';

interface mainProps {
  user: UserModel;
  logout: MouseEventHandler<HTMLElement>;
}

export const Main = ({ user, logout }: mainProps) => {
  return (
    <div className='main__container'>
      <div className='main__container-user'>
        Bienvenido(a) {user.email}, a tu aplicación de Cocteles
        <button
          type='button'
          className='btn btn-outline-danger'
          onClick={logout}
        >
          Cerrar Sesión
        </button>
      </div>
      <DefaultUser />
    </div>
  );
};
