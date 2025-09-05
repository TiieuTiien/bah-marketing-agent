import "./App.css";
import { AuthPage } from "./components/auth/AuthPage";
import Header from "./components/common/Header/Header";
import Sidebar from "./components/common/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <div className="content-container">
        <Sidebar />
        <AuthPage />
      </div>
    </>
  );
}

export default App;
