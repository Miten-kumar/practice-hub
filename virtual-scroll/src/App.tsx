import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;