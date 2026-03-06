import { useEffect, useMemo, useState } from "react";
import { List, type RowComponentProps } from "react-window";
import { productApi, useGetProductsQuery } from "../services/productApi";
import type { Product } from "../services/productApi";

const PAGE_SIZE = 10;
const LIST_HEIGHT = 420;
const ROW_HEIGHT = 56;

type ProductRowProps = {
  products: Product[];
};

function ProductRow({
  index,
  style,
  products,
}: RowComponentProps<ProductRowProps>) {
  const product = products[index];
  if (!product) return null;

  return (
    <div style={{ ...style, padding: "12px", borderBottom: "1px solid #eee" }}>
      {product.id}
      {product.title}
    </div>
  );
}

export default function ProductList() {
  const [page, setPage] = useState(1);
  const prefetchProducts = productApi.usePrefetch("getProducts");

  const { data = [], isLoading, isFetching, error } = useGetProductsQuery(page);
  const hasMore = data.length >= page * PAGE_SIZE;

  useEffect(() => {
    if (hasMore) {
      prefetchProducts(page + 1, { force: false });
    }
  }, [hasMore, page, prefetchProducts]);

  const rowProps = useMemo(() => ({ products: data }), [data]);

  const handleRowsRendered = ({
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }) => {
    const reachedEnd = stopIndex >= data.length - 2;
    if (reachedEnd && hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div>
      <List
        rowComponent={ProductRow}
        rowCount={data.length}
        rowHeight={ROW_HEIGHT}
        rowProps={rowProps}
        onRowsRendered={handleRowsRendered}
        overscanCount={4}
        style={{ height: LIST_HEIGHT, width: "100%", border: "1px solid #ddd" }}
      />

      <button
        disabled={isFetching || !hasMore}
        onMouseEnter={() => prefetchProducts(page + 1, { force: false })}
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        {isFetching ? "Loading..." : hasMore ? "Load More" : "No More Products"}
      </button>
    </div>
  );
}
