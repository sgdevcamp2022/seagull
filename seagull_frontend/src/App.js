//packages
import { Route, Routes } from 'react-router-dom';
import './App.css';

//pages
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import RoomMake from './components/pages/RoomMake';
import Signup from './components/pages/Signup';
import VideoShareRoom from './components/pages/VideoShareRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/roommake" element={<RoomMake />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/videoshare/:roomlink" element={<VideoShareRoom />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
