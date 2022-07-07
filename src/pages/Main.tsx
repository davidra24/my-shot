import { Coctails } from '../components/Coctails';
import { UserModel } from '../models/user.model';
import '../styles/main.css';

interface mainProps {
  user: UserModel | undefined;
}

export const Main = ({ user }: mainProps) => {
  return (
    <div className='main__container'>
      <div className='main__container-user'>
        Bienvenido(a) {user?.email}, a tu aplicación de Cocteles
      </div>
      <Coctails />
    </div>
  );
};
