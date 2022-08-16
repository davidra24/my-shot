import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Coctails } from '../components/Coctails';
import { StateModel } from '../models/redux.model';
import '../styles/main.css';

export const Main = () => {
  const user = useSelector((state: StateModel) => state.reducer.user);
  const mail = user?.email || '';

  return (
    <div className='main__container'>
      <div className='main__container-user'>
        Bienvenido(a) {mail.substring(0, mail.indexOf('@'))}, a tu aplicación de
        Cocteles
      </div>
      <Coctails />
    </div>
  );
};
