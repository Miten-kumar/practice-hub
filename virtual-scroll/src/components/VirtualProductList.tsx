import { List, type RowComponentProps } from "react-window";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface Props {
  products: Product[];
}

const VirtualProductList: React.FC<Props> = ({ products }) => {
  console.log(products.length)
  const Row = ({ index, style }: RowComponentProps) => {
    const startIndex = index * 4;
    const items = products.slice(startIndex, startIndex + 4);

    return (
      <div
        style={{
          ...style,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "10px",
        }}
      >
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };
  return (
    <List
      rowComponent={Row}
      rowCount={Math.ceil(products.length / 4)}
      rowHeight={140}
      rowProps={{}}
      overscanCount={5}
      style={{ height: 600, width: "100%" }}
    />
  );
};

export default VirtualProductList;
