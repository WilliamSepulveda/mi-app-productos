import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import useAutoLogout from "../hooks/useAuthListener";

import Login from "../components/Loginn";
import UploadProduct from "../components/UploadProductt";

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useAutoLogout(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
        }
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
      setLoading(false); // ✅ ya sabemos si hay user o no
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // o un spinner si querés

  return (
    <div className="p-6">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <div style={{ marginTop: "140px", fontSize:"1.5rem" }}>
        <h1 className="text-2xl font-bold mb-4">Panel de administración</h1>
        <p className="mb-6">¡Bienvenida {user.name}!</p>
        <UploadProduct />
      </div>
      

      )}
    </div>
  );
};

export default Admin;
