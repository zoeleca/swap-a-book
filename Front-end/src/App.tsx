import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// import Header from "./ui/components/Header.tsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;