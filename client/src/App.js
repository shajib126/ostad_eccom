import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import LoginSignUp from './components/Login/LoginSignUp';
import Profile from './components/Profile/Profile';


function App() {
  return (
    <BrowserRouter>
     <h1>Hllo</h1>
      <Routes>
       
        <Route path='/login' element={<LoginSignUp/>} />
        <Route path='/account' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
