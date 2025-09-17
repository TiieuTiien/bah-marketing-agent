import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/useAuthContext";

import "react-toastify/dist/ReactToastify.css"
import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <Outlet />
        <ToastContainer position="top-right" autoClose={3000} />
      </UserProvider>{" "}
    </>
  );
}

export default App;
