import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questions from './Pages/Questions';
import Pairing from './Pages/Pairing';
import TrueOrFalse from './Pages/TrueOrFalse';
import Pictures from './Pages/Pictures';
import PicturesPairing from './Pages/PicturesPairing';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/questions" Component={Questions} />
          <Route path="/pair" Component={Pairing} />
          <Route path="/trueorfalse" Component={TrueOrFalse} />
          <Route path="/pictures" Component={Pictures} />
          <Route path="/picturepair" Component={PicturesPairing} />
        </Routes>
      </Router>
    </>
  )
}

export default App
