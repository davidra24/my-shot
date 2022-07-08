import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useInputValue } from '../hooks/useInput';
import { IDrink } from '../models/coctails.model';
import { StateModel } from '../models/redux.model';
import { updateDrink } from '../services/firestoreCalls';
import { MiniLoading } from './MiniLoading';

interface drinkProps {
  drink: IDrink;
  getUpdatedDrinks: Function;
}

export const Drink = ({ drink, getUpdatedDrinks }: drinkProps) => {
  const [addMl, setAddMl] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const available = useInputValue(0);

  const saveNewMl = async () => {
    setLoading(true);
    try {
      const sum = Number(drink.available) + Number(available.value);
      await updateDrink(drink.uid, {
        ...drink,
        available: sum
      });
      available.setDefaultValue();
      setLoading(false);
      getUpdatedDrinks();
    } catch (error) {
      setLoading(false);
      setAddMl(false);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <>
        {loading ? (
          <Card.Body className='mini__loading-container'>
            <MiniLoading />
          </Card.Body>
        ) : (
          <>
            <Card.Img
              variant='top'
              className='drinks__image'
              src={drink.image}
            />
            <Card.Body>
              <Card.Title style={{ color: 'black' }}>{drink.name}</Card.Title>
              <div className='card-drinks__more'>
                <Card.Text style={{ color: 'black' }}>
                  Disponible: {drink.available}{' '}
                  {drink.available < 1000 ? 'ml' : 'lt'}
                </Card.Text>
                {addMl ? (
                  <Form>
                    <Form.Group
                      style={{
                        display: 'flex',
                        alignItems: ' center',
                        justifyContent: 'space-evenly'
                      }}
                    >
                      <Form.Control
                        type='number'
                        placeholder='ml'
                        style={{ width: '70%' }}
                        value={available.value}
                        onChange={available.onChange}
                      />
                      <Card.Link
                        style={{ cursor: 'pointer' }}
                        onClick={saveNewMl}
                      >
                        Ok
                      </Card.Link>
                    </Form.Group>
                  </Form>
                ) : (
                  <Card.Link
                    style={{ cursor: 'pointer' }}
                    onClick={() => setAddMl(true)}
                  >
                    Agregar [ml]
                  </Card.Link>
                )}
              </div>
            </Card.Body>
          </>
        )}
      </>
    </Card>
  );
};
