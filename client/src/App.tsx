import { useEffect } from 'react';
import './App.scss';
import Login from './Pages/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import { useAppSelector } from './app/hooks';
import { saveUser } from './features/user/userSlice';
import { useAppDispatch } from './app/hooks';
import Profile from './Pages/Profile/Profile';
import SignUp from './Pages/SignUp/SignUp';
import Header from './components/Header/Header';
import Messages from './Pages/Messages/Messages';

function App() {
  const signedIn = useAppSelector((state) => state.user.signedIn)
  const dispatch = useAppDispatch();

 

  useEffect (() => {
    if(sessionStorage.getItem('uid') && sessionStorage.getItem('uid') !== '') {
      dispatch(saveUser(JSON.stringify(sessionStorage.getItem('uid'))))
    }
  }, [])

  return (
      <div className="App">
        {signedIn && <Header />}
      <Routes>
        {!signedIn ? <Route index element={<Login />} />
        :
        <Route index element={<Home />} />}
        
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/messages' element={ <Messages /> } />
      </Routes>
      
      </div>
  );
}

export default App;