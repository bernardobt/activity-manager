import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/layout/NavBar.js";
import Home from "./components/pages/Home.js";

import AuthForm from "./components/auth/AuthForm.js";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<AuthForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
