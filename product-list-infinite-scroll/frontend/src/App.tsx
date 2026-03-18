import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        backgroundColor: "#f8fafc",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          margin: "0 0 24px",
          fontSize: 32,
          color: "#0f172a",
          textAlign: "center",
        }}
      >
        Product List
      </h1>
      <ProductList />
    </div>
  );
}
