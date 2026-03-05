import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./app/store";

import { getUserById } from "./app/slices/authSlice";
import { selectUsers } from "./app/selectors";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUserById(1));
  }, [dispatch]);

  console.log(user);

  return <h1>Redux</h1>;
}

export default App;
