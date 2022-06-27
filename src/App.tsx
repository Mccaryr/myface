import React from 'react';
import './App.scss';
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Feed />
    </div>
  );
}

export default App;