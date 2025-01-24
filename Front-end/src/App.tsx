import HomePage from "./presentation/pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./presentation/components/Header.tsx";
import LoginPage from "./presentation/pages/LoginPage.tsx";

// import Header from "./presentation/components/Header.tsx";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
