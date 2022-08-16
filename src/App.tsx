import React, { useEffect, useState } from 'react';
import { firebaseApp } from './firebase';
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Login } from './pages/Login';
import './styles/App.css';
import { Main } from './pages/Main';
import { UserModel } from './models/user.model';
import { Navbar } from './components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Drinks } from './pages/Drinks';
import { Orders } from './pages/Orders';
import { useDispatch } from 'react-redux';
import { setUserAction } from './redux/actions';
import { StateModel } from './models/redux.model';
import { useSelector } from 'react-redux';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const user = useSelector((state: StateModel) => state.reducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getRole(uid: string) {
    const docuRef = doc(firestore, `users/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    /** @ts-ignore */
    const usuario = await docuCifrada.data().role;
    return usuario;
  }

  function setUserWithFirebaseAndRol(userFirebase: User) {
    getRole(userFirebase.uid).then((role: string) => {
      const userData: UserModel = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        role
      };
      dispatch(setUserAction(userData));
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUserWithFirebaseAndRol(userFirebase);
      } else {
        dispatch(setUserAction(undefined));
      }
    });
  }, []);

  const logout = () => {
    signOut(auth);
    dispatch(setUserAction(undefined));
    navigate('/', { replace: true });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <Navbar logout={logout} />
      </header>
      {user ? (
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/drinks' element={<Drinks />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      ) : (
        <Routes location='/'>
          <Route path='/' element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
