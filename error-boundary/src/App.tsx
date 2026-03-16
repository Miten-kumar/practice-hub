import PageErrorBoundary from "./errors/components/PageErrorBoundary";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <PageErrorBoundary>
        <Dashboard />
      </PageErrorBoundary>
    </>
  );
}

export default App;
