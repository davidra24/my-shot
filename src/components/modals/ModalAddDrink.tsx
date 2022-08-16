import { Modal, Button, Form, ModalProps } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useInputValue } from '../../hooks/useInput';
import { StateModel } from '../../models/redux.model';
import { createDrink } from '../../services';
import { errorAlert } from '../alerts';

interface modalDrinksProps extends ModalProps {
  getAllDrinks: Function;
}

export const ModalAddDrink = ({
  show,
  handleClose,
  setIsLoading,
  getAllDrinks
}: modalDrinksProps) => {
  const name = useInputValue('');
  const image = useInputValue('');

  const save = async () => {
    setIsLoading(true);
    try {
      createDrink(name.value, image.value);
      name.setDefaultValue();
      image.setDefaultValue();
      getAllDrinks();
    } catch (error) {
      errorAlert('Error', 'No se han podido registrar bebidas');
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar bebidas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Nombre de bebida</Form.Label>
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
