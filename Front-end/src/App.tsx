import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./presentation/components/Header.tsx";
import HomePage from "./presentation/pages/HomePage.tsx";


function App() {
  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
