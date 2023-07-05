import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Foooter from './components/Foooter';
import Videos from './components/Videos';
import Upload from './components/Upload';
import Signup from './components/Signup';
import Login from './components/Login';
import axios from 'axios';
import Profile from './components/Profile';


axios.defaults.baseURL = 'http://localhost:8000/api/user'; 
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/videos' element={<Videos/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <Foooter/>
    </Router>
  );
}

export default App;
