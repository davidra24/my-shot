import React, { useEffect, useState } from 'react';
import { firebaseApp } from './firebase';
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Login } from './pages/Login';
import './styles/App.css';
import { Main } from './pages/Main';
import { UserModel } from './models/user.model';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState<UserModel>();

  async function getRole(uid: string) {
    const docuRef = doc(firestore, `users/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    /** @ts-ignore */
    const infoFinal = await docuCifrada.data().role;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(userFirebase: User) {
    getRole(userFirebase.uid).then((role) => {
      const userData: UserModel = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        role
      };
      setUser(userData);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        await setUserWithFirebaseAndRol(userFirebase);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  const logout = () => signOut(auth);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>My Shot</h1>
      </header>
      {user ? <Main user={user} logout={logout} /> : <Login />}
    </div>
  );
}

export default App;
