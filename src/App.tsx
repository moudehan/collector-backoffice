import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexte/AuthProvider";
import ArticleDetailPage from "./pages/Articles/ArticleDetailPage";
import ArticlesPage from "./pages/Articles/ArticlesPage";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import FraudAlertsPage from "./pages/FraudAlertPage";
import Login from "./pages/Login";
import UserDetailPage from "./pages/users/UserDetailPage";
import UsersAdminPage from "./pages/users/UsersPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={4000}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/adminDashboard"
              element={
                <ProtectedRoute requiredRoles={["ADMIN"]}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute requiredRoles={["ADMIN"]}>
                  <UsersAdminPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories"
              element={
                <ProtectedRoute requiredRoles={["ADMIN"]}>
                  <CategoriesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/articles"
              element={
                <ProtectedRoute requiredRoles={["ADMIN"]}>
                  <ArticlesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/alertfraude"
              element={
                <ProtectedRoute requiredRoles={["ADMIN"]}>
                  <FraudAlertsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/:id"
              element={
                <ProtectedRoute requiredRoles={["ADMIN"]}>
                  <UserDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/articles/:id"
              element={
                <ProtectedRoute requiredRoles={["ADMIN"]}>
                  <ArticleDetailPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
