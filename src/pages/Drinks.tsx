import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AddCard } from '../components/AddCard';
import { errorAlert } from '../components/alerts';
import { Drink } from '../components/Drink';
import { Loader } from '../components/Loader';
import { ModalAddDrink } from '../components/modals/ModalAddDrink';
import { firebaseApp } from '../firebase';
import { useInputValue } from '../hooks/useInput';
import { useUserIsAdmin } from '../hooks/useUserIsAdmin';
import { IDrink } from '../models/coctails.model';
import { StateModel } from '../models/redux.model';
import { setDrinksAction } from '../redux/actions';
import { callDrinks } from '../services/drinks.services';
import '../styles/drinks.css';

const firestore = getFirestore(firebaseApp);

export const Drinks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const userIsAdmin = useUserIsAdmin();

  const drinks = useSelector((state: StateModel) => state.reducer.drinks);
  const dispatch = useDispatch();

  const getAllDrinks = async () => {
    setIsLoading(true);
    try {
      const drinks = await callDrinks();
      dispatch(setDrinksAction(drinks));
      setIsLoading(false);
    } catch (error) {
      errorAlert('Error', 'No se han encontrado bebidas');
      dispatch(setDrinksAction([]));
      setIsLoading(false);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (!drinks || !drinks.length) {
      getAllDrinks();
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='drinks__container'>
          {drinks &&
            drinks.map((drink: IDrink) => (
              <Drink
                key={drink.uid}
                drink={drink}
                getUpdatedDrinks={getAllDrinks}
              />
            ))}
          {userIsAdmin && (
            <AddCard handleShow={handleShow}>
              <ModalAddDrink
                show={showModal}
                handleClose={handleClose}
                setIsLoading={setIsLoading}
                getAllDrinks={getAllDrinks}
              />
            </AddCard>
          )}
        </div>
      )}
    </>
  );
};
