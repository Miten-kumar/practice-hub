import { useEffect, useState } from "react";
import {
  useCreateUserMutation,
  useGetUsersQuery,
} from "./app/slices/authSlice";
import {
  useGetCartsQuery,
  useUpdateCartMutation,
} from "./app/slices/cartSlice";
import { productSlice, useGetProductsQuery } from "./app/slices/productSlice";

function App() {
  const { data: users, isError, isLoading: userLoading } = useGetUsersQuery();
  const {
    data: carts,
    isError: cartIsError,
    isLoading: cartIsLoading,
    error: cartError,
  } = useGetCartsQuery();
  const [page, setPage] = useState(1);

  const { data: productData, isLoading: ProductLoading } =
    useGetProductsQuery(page);

  const userAdd = {
    username: "name",
    email: "bdhbhbfhdb",
    password: "njnjnjnj",
  };

  const [
    createUser,
    {
      isError: createIsError,
      isLoading: createUserLoading,
      data: userData,
      error: createError,
    },
  ] = useCreateUserMutation();

  const [
    updateCart,
    {
      isError: cartUpdateIsError,
      isLoading: cartUpdateLoading,
      data: cartUpdateData,
      error: cartUpdateError,
    },
  ] = useUpdateCartMutation();

  console.log(
    "usercreate",
    createError,
    createUserLoading,
    userData,
    createIsError,
  );

  console.log(
    "cartupdate",
    cartUpdateData,
    cartUpdateError,
    cartUpdateLoading,
    cartUpdateIsError,
  );

  const handleUserCreate = () => {
    createUser(userAdd);
  };

  const cartUpdatingData = {
    id: 1,
    userId: 1,
    products: [
      {
        id: 0,
        title: "string",
        price: 0.1,
        description: "string",
        category: "string",
        image: "http://example.com",
      },
    ],
  };
  const cart_id = cartUpdatingData.id;
  const handleCartUpdate = () => {
    updateCart({ cart_id, cartUpdatingData });
  };

  useEffect(() => {
    if (users) {
      console.log(users);
    }
  }, [users]);

  useEffect(() => {
    if (carts) {
      console.log(carts);
    }
  }, [carts]);

  

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };
  const prefetchProduct = productSlice.usePrefetch("getProductById");

  console.log("cart", cartError, cartIsError, cartIsLoading);

  console.log("products", productData, ProductLoading);

  if (isError) return <h1>Error</h1>;

  if (userLoading) return <h1>Loading</h1>;

  return (
    <div>
      RTK query
      <button onClick={handleUserCreate}>click me1</button>
      <button onClick={handleCartUpdate}>click me2</button>
      <div>
        {productData?.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))}

        <button onClick={loadMore}>Load More</button>
      </div>
      <h1>prod</h1>
      <div>
        {productData?.map((product) => (
          <div
            key={product.id}
            onMouseEnter={() => prefetchProduct(product.id)}
          >
            {product.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
