import Counter from "./components/Counter";
import Search from "./components/Search";

function App() {
  return (
    <>
      <div>
        <div>
          <h1>Performance Demo</h1>
          <Counter />
        </div>
        <br />
        <br />
        <br />
        <div>
          <h1>Debounce / Throttling Demo</h1>
          <Search />
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default App;
