import { MouseEventHandler, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserModel } from '../models/user.model';
import '../styles/navbar.css';

interface navbarProps {
  user: UserModel | undefined;
  logout: MouseEventHandler<HTMLElement>;
}

export const Navbar = ({ user, logout }: navbarProps) => {
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
                  {user?.role === 'admin' && (
                    <>
                      <button type='button' className='btn'>
                        <Link to='/drinks' style={{ textDecoration: 'none' }}>
                          Bebidas
                        </Link>
                      </button>
                    </>
                  )}
                  <button type='button' className='btn'>
                    <Link to='/customize' style={{ textDecoration: 'none' }}>
                      Coctel personalizado
                    </Link>
                  </button>
                  <button type='button' className='btn'>
                    <Link to='/stats' style={{ textDecoration: 'none' }}>
                      ??Cu??nto beb???
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
                    Cerrar Sesi??n
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
