import { HashRouter, Route, Routes } from "react-router-dom";
import AppStarter from "./pages/AppStarter";
import AppIndex from "./pages/AppIndex";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppStarter />}>
          <Route path="" element={<AppIndex />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;