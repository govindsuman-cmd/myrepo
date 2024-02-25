import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Pagenotfound from "./pages/Pagenotfound";
function App() {
  return (
   <>
    <Routes>
     <Route path="/" element={<HomePage/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signin/>}/>
     <Route path='/dashboard' element={<Dashboard/>}/>
     <Route path="*" element={<Pagenotfound />} />
    </Routes>
   </>
  );
}

export default App;
