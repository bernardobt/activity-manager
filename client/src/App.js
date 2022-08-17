import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/layout/NavBar.js";
import Home from "./components/pages/Home.js";
import CustomToast from "./components/layout/CustomToast";

import AuthForm from "./components/auth/AuthForm.js";
import LoggedInPage from "./components/pages/LoggedInPage.js";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/toast" element={<CustomToast />} />
        </Route>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/loggedin" element={<LoggedInPage isLoggedIn={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
