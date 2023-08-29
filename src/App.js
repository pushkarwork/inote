
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
