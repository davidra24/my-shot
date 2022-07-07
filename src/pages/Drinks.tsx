import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { errorAlert } from '../components/alerts';
import { Loader } from '../components/Loader';
import { ModalAddDrink } from '../components/modals/ModalAddDrink';
import { firebaseApp } from '../firebase';
import { useInputValue } from '../hooks/useInput';
import { IDrink } from '../models/coctails.model';
import { StateModel } from '../models/redux.model';
import { setDrinksAction } from '../redux/actions';
import { callDrinks } from '../services/firestoreCalls';
import '../styles/drinks.css';

const firestore = getFirestore(firebaseApp);

export const Drinks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const name = useInputValue('');
  const image = useInputValue('');

  const drinks = useSelector((state: StateModel) => state.reducer.drinks);
  const dispatch = useDispatch();

  const getAllDrinks = async () => {
    setIsLoading(true);
    try {
      const drinks = await callDrinks();
      dispatch(setDrinksAction(drinks));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const save = async () => {
    setIsLoading(true);
    try {
      const drinksRef = collection(firestore, 'drinks');
      const documentRef = doc(drinksRef);
      await setDoc(documentRef, {
        name: name.value,
        image: image.value
      });
      name.setDefaultValue();
      image.setDefaultValue();
      getAllDrinks();
    } catch (error) {
      console.log(error);
      errorAlert('Error', 'No se han podido registrar bebidas');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!drinks) {
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
              <Card key={drink.uid} style={{ width: '18rem' }}>
                <Card.Img
                  variant='top'
                  className='drinks__image'
                  src={drink.image}
                />
                <Card.Body>
                  <Card.Title style={{ color: 'black' }}>
                    {drink.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            ))}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Img
                className='add__drink'
                src='https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png'
                onClick={handleShow}
              />
              <ModalAddDrink
                show={showModal}
                save={save}
                handleClose={handleClose}
                name={name}
                image={image}
              />
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};
