import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function PublicRoute() {
  const { user, checked } = useSelector((state) => state.auth);

  // ⏳ Auth check in progress
  if (!checked) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-textSecondary">
        <Loader2 className="animate-spin text-primary" size={28} />
        <p className="text-sm font-medium">Checking authentication…</p>
      </div>
    );
  }

  // ✅ Already logged in → dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // ❌ Not logged in → allow login/register
  return <Outlet />;
}
