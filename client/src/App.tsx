import React, { useEffect } from 'react';
import './App.scss';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import { useAppSelector } from './app/hooks';
import { saveUser } from './features/user/userSlice';
import { useAppDispatch } from './app/hooks';
//commit comment

function App() {
  const signedIn = useAppSelector((state) => state.user.signedIn)
  const dispatch = useAppDispatch();

  useEffect (() => {
    if(sessionStorage.getItem('uid')) {
      dispatch(saveUser(JSON.stringify(sessionStorage.getItem('uid'))))
    }
  }, [])

  return (
    <div className="App">
      {!signedIn ? <Login /> : <Home />}
      {/* <Routes>
        <Route index element={<Home />} />
      </Routes> */}
      
    </div>
  );
}

export default App;