import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/reduxHook";
import { loginUser } from "./redux/auth/authThunks";
import { logout } from "./redux/auth/authSlice";
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthUser,
  selectIsAuthenticated,
} from "./redux/auth/authSelectors";
import { fetchProducts } from "./redux/products/productThunks";
import {
  selectExpensiveProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "./redux/products/productSelectors";
import { addToCart, removeFromCart } from "./redux/cart/cartSlice";
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from "./redux/cart/cartSelectors";

function App() {
  const dispatch = useAppDispatch();

  const authUser = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authLoading = useAppSelector(selectAuthLoading);
  const authError = useAppSelector(selectAuthError);

  const products = useAppSelector(selectProducts);
  const productsLoading = useAppSelector(selectProductsLoading);
  const productsError = useAppSelector(selectProductsError);
  const expensiveProducts = useAppSelector(selectExpensiveProducts);

  const cartItems = useAppSelector(selectCartItems);
  const cartItemCount = useAppSelector(selectCartItemCount);
  const cartTotal = useAppSelector(selectCartTotal);

  const [email, setEmail] = useState("manush@gmail.com");
  const [password, setPassword] = useState("password123");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <main>
      <h1>Redux Toolkit Store</h1>

      <section>
        <h2>Auth</h2>
        {isAuthenticated ? (
          <>
            <p>{authUser?.email}</p>
            <button type="button" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button type="submit" disabled={authLoading}>
              {authLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
        {authError && <p>{authError}</p>}
      </section>

      <section>
        <h2>Products</h2>
        <button
          type="button"
          onClick={() => dispatch(fetchProducts())}
          disabled={productsLoading}
        >
          {productsLoading ? "Loading..." : "Fetch products"}
        </button>
        {productsError && <p>{productsError}</p>}
        <p>Products: {products.length}</p>
        <p>Expensive: {expensiveProducts.length}</p>

        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                    }),
                  )
                }
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Cart</h2>
        <p>Items: {cartItemCount}</p>
        <p>Total: ${cartTotal.toFixed(2)}</p>

        {cartItems.length === 0 ? (
          <p>Empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
