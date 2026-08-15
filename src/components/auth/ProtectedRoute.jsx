import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication and role detection finish
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-600">
            Checking access...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  /*
   * Normalize role.
   *
   * AuthContext may return:
   * "Teacher"
   *
   * or:
   * { name: "Teacher" }
   *
   * or:
   * { role: "Teacher" }
   */
  const normalizedRole =
    typeof role === "string"
      ? role.trim().toLowerCase()
      : role?.name?.trim().toLowerCase() ||
        role?.role?.trim().toLowerCase() ||
        "";

  const normalizedAllowedRoles = allowedRoles.map((item) =>
    String(item).trim().toLowerCase()
  );

  console.log("PROTECTED ROUTE CHECK:", {
    userId: user?.id,
    role,
    normalizedRole,
    allowedRoles,
    normalizedAllowedRoles,
    path: location.pathname,
  });

  // Role not loaded / invalid
  if (!normalizedRole) {
    return (
      <Navigate
        to="/access-denied"
        replace
        state={{
          reason: "Role could not be determined.",
        }}
      />
    );
  }

  // Role not authorized
  if (!normalizedAllowedRoles.includes(normalizedRole)) {
    console.warn("ACCESS DENIED:", {
      role: normalizedRole,
      allowedRoles: normalizedAllowedRoles,
      path: location.pathname,
    });

    return (
      <Navigate
        to="/access-denied"
        replace
        state={{
          reason: "You do not have permission to access this area.",
          role: normalizedRole,
        }}
      />
    );
  }

  // Authorized
  return children;
}