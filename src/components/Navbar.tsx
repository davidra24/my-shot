import { MouseEventHandler, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUserIsAdmin } from '../hooks/useUserIsAdmin';
import { StateModel } from '../models/redux.model';
import '../styles/navbar.css';

interface navbarProps {
  logout: MouseEventHandler<HTMLElement>;
}

export const Navbar = ({ logout }: navbarProps) => {
  const user = useSelector((state: StateModel) => state.reducer.user);
  const userIsAdmin = useUserIsAdmin();
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className='navbar bg-dark fixed-top'>
      <div className='container-fluid'>
        <h1 style={{ cursor: 'pointer' }}>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            My Shot
          </Link>
        </h1>
        <button
          className='navbar-toggler custom-toggler'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasNavbar'
          aria-controls='offcanvasNavbar'
          onClick={handleShow}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <Offcanvas show={show} onHide={handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>My Shot</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className='body__container'>
              {user && (
                <>
                  <button type='button' className='btn'>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                      Inicio
                    </Link>
                  </button>
                  <button type='button' className='btn'>
                    <Link to='/orders' style={{ textDecoration: 'none' }}>
                      Pedidos
                    </Link>
                  </button>
                  <button type='button' className='btn'>
                    <Link to='/drinks' style={{ textDecoration: 'none' }}>
                      Bebidas
                    </Link>
                  </button>
                  {userIsAdmin && <></>}
                  <button type='button' className='btn'>
                    <Link to='/customize' style={{ textDecoration: 'none' }}>
                      Coctel personalizado
                    </Link>
                  </button>
                  <button type='button' className='btn'>
                    <Link to='/stats' style={{ textDecoration: 'none' }}>
                      ¿Cuánto bebí?
                    </Link>
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger'
                    onClick={(e) => {
                      logout(e);
                      setShow(false);
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  );
};
