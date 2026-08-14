import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const {
    user,
    role,
    loading,
    dashboardPath,
  } = useAuth();

  const location = useLocation();

  // -----------------------------------------
  // Authentication is still loading
  // -----------------------------------------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

          <p className="text-sm text-slate-300">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // User is not authenticated
  // -----------------------------------------
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // -----------------------------------------
  // User has no recognized role
  // -----------------------------------------
  if (!role) {
    return <Navigate to="/access-denied" replace />;
  }

  // -----------------------------------------
  // Check allowed roles
  // -----------------------------------------
  const hasPermission =
    allowedRoles.length === 0 ||
    allowedRoles.some(
      (allowedRole) =>
        String(allowedRole).toLowerCase() ===
        String(role).toLowerCase()
    );

  // -----------------------------------------
  // Wrong role
  // -----------------------------------------
  if (!hasPermission) {
    return (
      <Navigate
        to="/access-denied"
        replace
        state={{
          attemptedPath: location.pathname,
          dashboardPath,
        }}
      />
    );
  }

  // -----------------------------------------
  // Authorized
  // -----------------------------------------
  return children;
}