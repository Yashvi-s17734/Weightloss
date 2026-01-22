import { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setPage("dashboard");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <>
      {page === "signup" && <Signup goLogin={() => setPage("login")} />}

      {page === "login" && (
        <Login
          goDashboard={() => setPage("dashboard")}
          goSignup={() => setPage("signup")}
        />
      )}

      {page === "dashboard" && <Dashboard onLogout={logout} />}
    </>
  );
}

export default App;
