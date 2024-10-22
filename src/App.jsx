import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import AdminPage from "./pages/adminPages/admin";
import HomePage from "./pages/client-pages/homePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/*"
            element={<h1>404, Page Not Found</h1>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;


// 60% - #FEF9F2
// 30% - #7E60BF
// 10% - #E4B1F0