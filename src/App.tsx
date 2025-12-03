import { SnackbarProvider } from "notistack"; // 👉 Ajout
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ArticleDetailPage from "./pages/Articles/ArticleDetailPage";
import ArticlesPage from "./pages/Articles/ArticlesPage";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import FraudAlertsPage from "./pages/FraudAlertPage";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={4000}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/articles"
            element={
              <ProtectedRoute>
                <ArticlesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/alertfraude"
            element={
              <ProtectedRoute>
                <FraudAlertsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles/:id"
            element={
              <ProtectedRoute>
                <ArticleDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
