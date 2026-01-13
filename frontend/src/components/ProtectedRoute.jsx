import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2, ShieldAlert } from "lucide-react";

export default function ProtectedRoute() {
  const { user, checked } = useSelector((state) => state.auth);
  const location = useLocation();

  // ⏳ Auth check in progress
  if (!checked) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-textSecondary">
        <Loader2 className="animate-spin text-primary" size={28} />
        <p className="text-sm font-medium">Checking authentication…</p>
      </div>
    );
  }

  // ❌ Not authenticated
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // ✅ Authenticated
  return <Outlet />;
}
