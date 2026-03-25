import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
