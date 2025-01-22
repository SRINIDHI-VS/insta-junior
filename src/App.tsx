import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Login from './Components/pages/Login';
import ImageGallery from './Components/features/ImageGallery';
import Register from './Components/pages/Register';

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
