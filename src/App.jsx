import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import AdminPage from "./pages/adminPages/admincomponents/adminFolder/admin";
import HomePage from "./pages/client-pages/homePage";
import LoginPage from "./pages/login/loginPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-[#FEF9F2] text-[#7E60BF]">
                <h1 className="text-[10rem] font-bold leading-none">404</h1>
                <p className="text-2xl mt-4 text-[#7E60BF] font-semibold">
                  Oops! We can't seem to find the page you're looking for.
                </p>
                <p className="text-lg text-[#E4B1F0] mt-2">
                  It may have been moved or no longer exists.
                </p>
                <Link to="/">
                  <button className="mt-8 px-8 py-4 bg-[#7E60BF] text-[#FEF9F2] font-semibold rounded-lg shadow-lg hover:bg-[#E4B1F0] transition ease-in-out duration-300">
                    Back to Home
                  </button>
                </Link>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// 60% - #FEF9F2
// 30% - #7E60BF
// 10% - #E4B1F0
