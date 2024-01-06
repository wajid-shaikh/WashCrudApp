import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateUpdate from "./pages/CreateUpdate";
import Read from "./pages/Read";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create" element={<CreateUpdate />} />
        <Route path="/update/:id" element={<CreateUpdate />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
    </Router>
  );
}

export default App;
