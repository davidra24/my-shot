import { useEffect, useState } from 'react';
import { firebaseApp } from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ICoctail } from '../models/coctails.model';
import { errorAlert, successAlert } from './alerts';
import { Loader } from './Loader';
import { Button, Card } from 'react-bootstrap';
import { callDrinks, createOrder } from '../services';
import { useSelector } from 'react-redux';
import { StateModel } from '../models/redux.model';
import { useDispatch } from 'react-redux';
import { setDrinksAction } from '../redux/actions';
import { AddCard } from './AddCard';
import { useUserIsAdmin } from '../hooks/useUserIsAdmin';
import { ModalAddCoctail } from './modals/ModalAddCoctail';
import '../styles/coctails.css';

const firestore = getFirestore(firebaseApp);

export const Coctails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coctails, setCoctails] = useState<Array<ICoctail>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const userIsAdmin = useUserIsAdmin();

  const drinks = useSelector((state: StateModel) => state.reducer.drinks);
  const dispatch = useDispatch();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const getContails = async () => {
    setIsLoading(true);
    try {
      const coctailsRef = collection(firestore, 'coctails');
      const docsCoctails = await getDocs(coctailsRef);
      const documents: Array<ICoctail> = [];
      docsCoctails.forEach((doc) => {
        const obj = { ...doc.data(), uid: doc.id } as ICoctail;
        documents.push(obj);
      });
      setCoctails(documents);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      errorAlert('Error', 'No se han encontrado cocteles');
      setIsLoading(false);
    }
  };

  const orderCoctail = async (coctail: ICoctail) => {
    setIsLoading(true);
    try {
      await createOrder(coctail, drinks);
      await getAllDrinks();
      setIsLoading(false);
      return successAlert(
        'Exitoso',
        'Se ha registrado tu pedido, en un segundo te lo entregaremos'
      );
    } catch (error) {
      errorAlert('Error', 'No se ha podido registrar tu pedido');
      setIsLoading(false);
    }
  };

  const getAllDrinks = async () => {
    try {
      const allDrinks = await callDrinks();
      dispatch(setDrinksAction(allDrinks));
    } catch (error) {
      console.log(error);
    }
  };

  const initialFunctions = async () => {
    if (!drinks || !drinks.length) {
      getAllDrinks();
    }
    await getContails();
  };

  useEffect(() => {
    initialFunctions();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='default-user__container'>
          {coctails.map((coctail: ICoctail) => (
            <Card key={coctail.uid} style={{ width: '18rem' }}>
              <Card.Img
                variant='top'
                className='drinks__image'
                src={coctail.image}
              />
              <Card.Body>
                <Card.Title style={{ color: 'black' }}>
                  {coctail.name}
                </Card.Title>
                <Card.Text className='card-content__default'>
                  {coctail.ingredients.map((ingredient, index) => (
                    <span key={index} className='badge bg-info'>
                      {ingredient.name}
                    </span>
                  ))}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant='primary' onClick={() => orderCoctail(coctail)}>
                  Dame este
                </Button>
              </Card.Footer>
            </Card>
          ))}
          {userIsAdmin && (
            <AddCard handleShow={handleShow}>
              <ModalAddCoctail
                show={showModal}
                handleClose={handleClose}
                setIsLoading={setIsLoading}
              />
            </AddCard>
          )}
        </div>
      )}
    </>
  );
};
