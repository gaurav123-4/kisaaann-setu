import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Register from './Components/Register.jsx';
import SignIn from './Components/SignIn.jsx';
import Pest from './Components/Pest.jsx';
import CropRecommendation from './Components/CropRecommendation.jsx';
import Weather from './Components/Weather.jsx';
import SchemesPage from './Components/SchemesPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<SignIn />} />
        <Route path="pest" element={<Pest />} />
        <Route path="crop" element={<CropRecommendation />} />
        <Route path="weather" element={<Weather />} />
        <Route path="schemes" element={<SchemesPage />} />
      </Route>
    </Routes>
  );
}
