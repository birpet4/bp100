import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questions from './Pages/Questions';
import Pairing from './Pages/Pairing';
import TrueOrFalse from './Pages/TrueOrFalse';
import MultipleAnswer from './Pages/MultipleAnswer';
import PictureGuess from './Pages/PictureGuess';
import Home from './Pages/Home';
import header from "./assets/Fejléc_telo.jpg";

function App() {
  return (
    <>
      <div className='header'><img src={header} /></div>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/questions" Component={Questions} />
          <Route path="/pair" Component={Pairing} />
          <Route path="/trueorfalse" Component={TrueOrFalse} />
          <Route path="/multiple" Component={MultipleAnswer} />
          <Route path="/pictureguess" Component={PictureGuess} />
        </Routes>
      </Router>
    </>
  )
}

export default App
