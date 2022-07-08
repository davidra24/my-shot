import { Coctails } from '../components/Coctails';
import { UserModel } from '../models/user.model';
import '../styles/main.css';

interface mainProps {
  user: UserModel | undefined;
}

export const Main = ({ user }: mainProps) => {
  const mail = user?.email || '';
  return (
    <div className='main__container'>
      <div className='main__container-user'>
        Bienvenido(a) {mail.substring(0, mail.indexOf(':'))}, a tu aplicación de
        Cocteles
      </div>
      <Coctails />
    </div>
  );
};
