import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Login from './Components/Login';
import ImageGallery from './Components/ImageGallery';
import Register from './Components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gallery" element={<ImageGallery />} />
      </Routes>
    </Router>
  );
};

export default App;
