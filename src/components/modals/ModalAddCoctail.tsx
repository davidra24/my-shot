import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Modal, ToggleButton } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IinputValue, useInputValue } from '../../hooks/useInput';
import { modalProps } from '../../interfaces';
import { IIngredient } from '../../models/coctails.model';
import { StateModel } from '../../models/redux.model';
import { ToggleDrink } from '../ToggleDrink';

interface addCoctailProps extends modalProps {}

export const ModalAddCoctail = ({
  show,
  handleClose,
  setIsLoading
}: addCoctailProps) => {
  const drinks = useSelector((state: StateModel) => state.reducer.drinks);
  const name = useInputValue('');
  const image = useInputValue('');
  const [ingredients, setIngredients] = useState<Array<IIngredient>>([]);
  const [checked, setChecked] = useState<Array<boolean>>([]);

  const save = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const arr = [...drinks].map(() => false);
    setChecked(arr);
  }, []);

  const setCheckedBool = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const temporalChecked = [...checked];
    console.log({ temporalChecked });

    temporalChecked[index] = e.target.checked;
    console.log(index, temporalChecked);
  };

  return (
    <Modal show={show} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar cocteles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Nombre del coctel</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nombre de bebida'
              value={name.value}
              onChange={(e) => name.onChange(e)}
            />
            <br />
            <Form.Label>Url de imagen</Form.Label>
            <Form.Control
              type='text'
              placeholder='Url de imagen'
              value={image.value}
              onChange={(e) => image.onChange(e)}
            />
            {drinks.map((drink, index) => {
              console.log({ index });

              return (
                <ToggleDrink
                  key={index}
                  checked={checked[index]}
                  drink={drink}
                  index={index}
                  setChecked={setCheckedBool}
                />
              );
            })}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={() => {
            handleClose();
            save();
          }}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
