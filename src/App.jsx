import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CitasProvider } from "./context/CitasContext";
import Home from "./pages/Home";
import CrearCitas from "./pages/CrearCita";
import Citas from "./pages/Citas";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
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
            <Route path="/admin" element= {<Admin />}/>
          </Routes>
          </main>
        </div>
      </Router>
    </CitasProvider>
  );
}

export default App;