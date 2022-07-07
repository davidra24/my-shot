import { useEffect, useState } from 'react';
import { firebaseApp } from '../firebase';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc
} from 'firebase/firestore';
import { ICoctail } from '../models/coctails.model';
import { errorAlert, successAlert } from './alerts';
import { Loader } from './Loader';
import '../styles/coctails.css';
import { getAuth } from 'firebase/auth';
import { Button, Card } from 'react-bootstrap';

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export const Coctails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coctails, setCoctails] = useState<Array<ICoctail>>([]);

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

  const orderCoctail = async (coctail: string) => {
    setIsLoading(true);
    try {
      const user = auth.currentUser?.uid;
      const ordersRef = collection(firestore, 'orders');
      const documentRef = doc(ordersRef);
      await setDoc(documentRef, {
        user,
        coctail,
        active: true
      });
      successAlert(
        'Exitoso',
        'No se ha registrado tu pedido, en un segundo te lo entregaremos'
      );
      setIsLoading(false);
    } catch (error) {
      errorAlert('Error', 'No se ha podido registrar tu pedido');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContails();
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
                <Button
                  variant='primary'
                  onClick={() => orderCoctail(coctail.uid)}
                >
                  Dame este
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
