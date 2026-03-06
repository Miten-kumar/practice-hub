import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        padding: "16px",
      }}
    >
      <img
        src={product.images[0]}
        width={80}
        height={80}
        style={{ objectFit: "cover" }}
      />

      <div>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
