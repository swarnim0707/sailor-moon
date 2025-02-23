import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home.jsx";
import FavouritePhases from "./components/favouritePhases/favPhases.jsx";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite-phases" element={<FavouritePhases />} />
        </Routes>
    </Router>
  );
}

export default App;
