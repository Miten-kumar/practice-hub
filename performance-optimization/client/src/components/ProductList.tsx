import type { Product } from "../types/product";

type ProductListProps = {
  products: Product[];
};

function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid">
      {products.map((product) => (
        <div key={product.id} className="card">
          <img alt={product.title} src={product.image} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
