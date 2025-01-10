import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./ui/components/Header.tsx";
import LoginPage from "./pages/LoginPage.tsx";

// import Header from "./ui/components/Header.tsx";

function App() {
  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;