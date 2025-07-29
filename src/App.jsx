import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CitasProvider } from "./context/CitasContext";
import Home from "./pages/Home";
import CrearCitas from "./pages/CrearCita";
import Citas from "./pages/Citas";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return(
    <CitasProvider>
        <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
          <Routes>
            <Route path="/" element= {<Home />}/>
            <Route path="/crear-citas" element= {<CrearCitas />}/>
            <Route path="/citas" element= {<Citas />}/>
            <Route path="/login" element= {<Login />}/>
            <Route path="/admin" element= {<ProtectedRoute>
              <Admin />
            </ProtectedRoute>} />
          </Routes>
          </main>
        </div>
      </Router>
    </CitasProvider>
  );
}

export default App;