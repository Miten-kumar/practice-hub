import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/features/productsSlice";
import { useEffect } from "react";
import type { RootState, AppDispatch } from '../Redux/store'


function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state:RootState) => state.product.items) as Array<{id: string | number; title: string}>;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {products.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}

export default Products;