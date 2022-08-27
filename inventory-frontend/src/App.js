import { Products } from "./components/Products";
import { ProductsCreate } from "./components/ProductsCreate";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Orders } from "./components/Orders";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/create" element={<ProductsCreate />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
