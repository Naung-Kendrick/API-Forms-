import { HashRouter, Route, Routes } from "react-router-dom";
import AppStarter from "./pages/AppStarter";
import AppIndex from "./pages/AppIndex";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import UserProtected from "./routes/UserProtected";
import AuthProtected from "./routes/AuthProtected";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppStarter />}>
          <Route path="" element={
            <UserProtected>
              <AppIndex />
            </UserProtected>
          } />

          <Route path="register" element={
            <AuthProtected>
              <Register />
            </AuthProtected>
          } />
          <Route path="login" element={
            <AuthProtected>
              <Login />
            </AuthProtected>
          } />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;