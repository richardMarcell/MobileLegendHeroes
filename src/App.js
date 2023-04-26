import './App.css';
import Index from './components/heroes/index';
import Show from './components/heroes/show';
import Store from './components/heroes/store';
import Login from './components/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<Login />} />
          <Route path='/heroes' element = {<Index/>} />
          <Route path='/heroes/:id' element = {<Show />} />
          <Route path='/heroes/create' element = {<Store />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
