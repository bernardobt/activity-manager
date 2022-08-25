import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home.js";
import CustomToast from "./components/layout/CustomToast";

import RequireAuth from "./components/auth/RequireAuth.js";
import LoggedInPage from "./components/pages/LoggedInPage.js";
import RegisterForm from "./components/pages/RegisterForm.js";
import LoginForm from "./components/pages/LoginForm.js";
import Layout from "./components/layout/Layout.js";
import Dashboard from "./components/pages/Dashboard.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route element={<RequireAuth />}>
          <Route path="loggedin" element={<LoggedInPage />} />
        </Route>
      </Route>
    </Routes>
    // </BrowserRouter>
  );
}

export default App;
