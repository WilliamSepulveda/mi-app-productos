// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import UploadedProductt from "./components/UploadProductt"; // 👈 importa el componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/upload" element={<UploadedProductt />} /> {/* 👈 nueva ruta */}
        <Route path="/" element={<h1>Página pública (productos pronto)</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
