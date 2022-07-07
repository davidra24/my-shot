import { useEffect, useState } from 'react';
import { firebaseApp } from '../firebase';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs
} from 'firebase/firestore';
import { ICoctail } from '../models/coctails.model';
import { errorAlert } from './alerts';
import { Loader } from './Loader';
import '../styles/defaultUser.css';

const firestore = getFirestore(firebaseApp);

export const DefaultUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coctails, setCoctails] = useState<Array<ICoctail>>([]);

  async function getContails() {
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
  }

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
            <div key={coctail.uid} className='card' style={{ width: '18rem' }}>
              <img
                src={coctail.image}
                className='card-img-top'
                alt={coctail.name}
                width='250'
                height='300'
              />
              <div className='card-body'>
                <h5 className='card-title'>{coctail.name}</h5>
                <div className='card-content__default'>
                  {coctail.ingredients.map((ingredient, index) => (
                    <span key={index} className='badge bg-info'>
                      {ingredient}
                    </span>
                  ))}
                </div>
                <button
                  type='button'
                  className='btn btn-outline-primary button-card__contail'
                  onClick={() =>
                    alert('Alto ahí Vaquero, esto  todavía no está ')
                  }
                >
                  Dame este
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
