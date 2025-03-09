import { useState } from "react";
import Login from "../components/Loginn";
import UploadProduct from "../components/UploadProductt";

const Admin = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="p-6">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Panel de administración</h1>
          <p className="mb-6">¡Bienvenida {user.name}!</p>
          <UploadProduct />
        </div>
      )}
    </div>
  );
};

export default Admin;
