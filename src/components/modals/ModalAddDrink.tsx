import { Modal, Button, Form } from 'react-bootstrap';
import { IinputValue } from '../../hooks/useInput';

interface addDrinkProps {
  show: boolean;
  handleClose: Function;
  save: Function;
  name: IinputValue;
  image: IinputValue;
}

export const ModalAddDrink = ({
  show,
  handleClose,
  save,
  name,
  image
}: addDrinkProps) => (
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
