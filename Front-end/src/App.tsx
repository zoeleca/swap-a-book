import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./presentation/pages/HomePage.tsx";
import ProfilePage from "./presentation/pages/ProfilePage.tsx";
import AuthCallback from "./presentation/hooks/CallBack.tsx";
import Header from "./presentation/components/Header.tsx";

const App = () => {


  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/callback" element={<AuthCallback/>}/>
      </Routes>
    </Router>
  );
};

export default App;
