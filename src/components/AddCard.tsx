import { MouseEventHandler, ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { ADD_ICON } from '../utils';

interface addCardProps {
  children: ReactNode;
  handleShow: MouseEventHandler<HTMLImageElement>;
}

export const AddCard = ({ children, handleShow }: addCardProps) => (
  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Img
        className='add__something'
        src={ADD_ICON}
        onClick={handleShow}
      />
      {children}
    </Card.Body>
  </Card>
);
