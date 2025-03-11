// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import UploadProduct from "./components/UploadProductt";
import ProductGallery from "./components/ProductGallery"; // 👈 Importamos galería

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/upload" element={<UploadProduct />} />
        <Route path="/" element={<ProductGallery />} /> {/* 👈 Mostramos productos públicos */}
      </Routes>
    </Router>
  );
};

export default App;
