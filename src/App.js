import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoFavs from './components/NoFavs';
import HasFavs from './components/HasFavs';
import AddFavs from './components/AddFavs';


function App() {

  let data = JSON.parse(localStorage.getItem("npmFavs")) || [];
  console.log(data);
  return (
    <Routes>
      <Route path='/' element={data.length == 0 ? <NoFavs/> : <HasFavs />} />
      <Route path='/addFavs' element={<AddFavs/>} />
      <Route path='/favs' element={<HasFavs/>} />
    </Routes>
  );
}

export default App;
