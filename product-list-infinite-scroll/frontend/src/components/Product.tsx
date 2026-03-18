export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function Product(product: ProductProps) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
        overflow: "hidden",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          height: 220,
          objectFit: "cover",
          backgroundColor: "#f3f4f6",
        }}
      />
      <div style={{ padding: 16 }}>
        <h3
          style={{
            margin: "0 0 10px",
            fontSize: 20,
            color: "#111827",
          }}
        >
          {product.title}
        </h3>
        <p
          style={{
            margin: "0 0 14px",
            color: "#4b5563",
            lineHeight: 1.5,
          }}
        >
          {product.description}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: "#0f766e",
          }}
        >
          ${product.price}
        </p>
      </div>
    </div>
  );
}
