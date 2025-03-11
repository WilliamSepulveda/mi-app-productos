import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const useAutoLogout = (user, timeout = 5 * 60 * 1000) => {
  useEffect(() => {
    if (!user) return;

    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        signOut(auth);
        localStorage.removeItem("user");
        window.location.href = "/"; // redirige al home
      }, timeout);
    };

    const events = ["mousemove", "keydown", "click", "touchstart"];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // inicializa el contador

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timer);
    };
  }, [user, timeout]);
};

export default useAutoLogout;
