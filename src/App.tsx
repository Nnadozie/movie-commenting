import { Routes, Route } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Movies from './components/Movies';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="/movies/:name/:runtime/comments" element={<Chat />} />
    </Routes>
  );
}

export default App;
