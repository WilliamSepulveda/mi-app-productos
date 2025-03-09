// src/components/UploadProduct.js
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase/config";
import "../styles/UploadProductt.css";

const storage = getStorage(app);
const db = getFirestore(app);

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageRef = ref(storage, `products/${Date.now()}_${formData.image.name}`);
      await uploadBytes(imageRef, formData.image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "products"), {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imageUrl,
        createdAt: new Date(),
      });

      setSuccess("Producto subido con éxito 🎉");
      setFormData({ name: "", description: "", price: "", image: null });
    } catch (error) {
      console.error("Error al subir producto:", error);
      setSuccess("Error al subir producto ❌");
    }

    setLoading(false);
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
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="form-input"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="form-button"
      >
        {loading ? "Subiendo..." : "Subir producto"}
      </button>

      {success && <p className="form-message">{success}</p>}
    </form>
    </div>
  );
};

export default UploadProduct;
