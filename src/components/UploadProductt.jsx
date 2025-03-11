// src/components/UploadProduct.js
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, app } from "../firebase/config"
import "../styles/UploadProductt.css";

const db = getFirestore(app);

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "products"), {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl,
        createdAt: new Date(),
      });

      setSuccess("Producto subido con éxito 🎉");
      setFormData({ name: "", description: "", price: "", imageUrl: "" });
    } catch (error) {
      console.error("Error al subir producto:", error);
      setSuccess("Error al subir producto ❌");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("user");
    window.location.reload(); // fuerza la recarga pa que vuelva al login
  };

  return (
    <div className="contenedor-form">
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">Subir nuevo producto</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="URL de la imagen (Imgur, Cloudinary, etc)"
          value={formData.imageUrl}
          onChange={handleChange}
          className="form-input"
          required
        />

        <button type="submit" disabled={loading} className="form-button">
          {loading ? "Subiendo..." : "Subir producto"}
        </button>

        {success && <p className="form-message">{success}</p>}

        <button type="button" className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
