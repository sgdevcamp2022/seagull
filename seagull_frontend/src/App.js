//packages
import { Route, Routes } from 'react-router-dom';
import './App.css';

//pages
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import PrivateRoute from './components/pages/PrivateRoute';
import RedirectPage from './components/pages/PrivateRoute';
import RoomMake from './components/pages/RoomMake';
import Signup from './components/pages/Signup';
import VideoShareRoom from './components/pages/VideoShareRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoomMake />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/redirect/:roomlink" element={<RedirectPage />} /> */}
      <Route path="/videoshare/:roomlink" element={<PrivateRoute />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
