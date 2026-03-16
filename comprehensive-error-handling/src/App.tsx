import type { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import GlobalErrorBoundary from "./errorBoundaries/GlobalErrorBoundary";
import PageErrorBoundry from "./errorBoundaries/PageErrorBoundary";

export default function App(): ReactElement {
  return (
    <GlobalErrorBoundary>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PageErrorBoundry>
                <Dashboard />
              </PageErrorBoundry>
            }
          />
          <Route
            path="/login"
            element={
              <PageErrorBoundry>
                <Login />
              </PageErrorBoundry>
            }
          />
          <Route
            path="/profile"
            element={
              <PageErrorBoundry>
                <Profile />
              </PageErrorBoundry>
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route
            path="*"
            element={
              <PageErrorBoundry>
                <Dashboard />
              </PageErrorBoundry>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </GlobalErrorBoundary>
  );
}
