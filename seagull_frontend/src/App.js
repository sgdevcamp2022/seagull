//packages
import { Route, Routes } from 'react-router-dom';
import './App.css';

//pages
import Login from './components/pages/Login';
import RoomMake from './components/pages/RoomMake';
import Signup from './components/pages/Signup';
import VideoShareRoom from './components/pages/VideoShareRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoomMake />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/videoshare/:roomlink" element={<VideoShareRoom />} />
    </Routes>
  );
}

export default App;
