import { BuggyComponent } from "../components/BuggyComponent";
import UserList from "../components/UserList";
import ComponentErrorBoundary from "../errors/components/ComponentErrorBoundary";
import { logError } from "../services/errorLogger";

const Dashboard = () => {
  return (
    <>
      <ComponentErrorBoundary>
        <UserList />
      </ComponentErrorBoundary>
      <ComponentErrorBoundary>
        <BuggyComponent />
      </ComponentErrorBoundary>
      <ComponentErrorBoundary>
        <button
          onClick={() => {
            try {
              throw new Error("new error!");
            } catch (err) {
              logError(err as Error, "button_click");
            }
          }}
        >
          Break the world
        </button>
      </ComponentErrorBoundary>
    </>
  );
};

export default Dashboard;
