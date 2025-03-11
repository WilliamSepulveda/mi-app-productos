// src/components/ProductGallery.jsx
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "../firebase/config";
import "../styles/ProductGallery.css";

const db = getFirestore(app);

const ProductGallery = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="gallery-container">
      <h2>Productos disponibles</h2>
      <div className="gallery-grid">
        {products.map((product) => (
          <div key={product.id} className="gallery-card">
            <img src={product.imageUrl} alt={product.name} className="gallery-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
