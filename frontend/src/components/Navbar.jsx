import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "@/features/auth/authThunks";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Gavel,
  Search,
  Plus,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Navbar() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  const navLinks = [
    { name: "Browse Gigs", path: "/", icon: Search },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, auth: true },
    { name: "My Gigs", path: "/my-gigs", icon: Briefcase, auth: true },
    { name: "My Bids", path: "/my-bids", icon: Gavel, auth: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl shadow-sm">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
          </div>
          <span className="text-2xl font-black tracking-tight text-textPrimary">
            Gig<span className="text-primary">Flow</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            if (link.auth && (!user || loading)) return null;

            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-textSecondary hover:text-textPrimary hover:bg-muted"
                }`}
              >
                <Icon size={18} />
                <span>{link.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-xl border border-primary/20"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {!loading && !user ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-semibold text-textSecondary hover:text-primary px-3 py-2 rounded-lg transition"
              >
                <LogIn size={18} />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 bg-primary hover:bg-primaryDark text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                <UserPlus size={18} />
                Join Now
              </Link>
            </>
          ) : !loading && (
            <div className="flex items-center gap-3">
              <Link
                to="/create"
                className="hidden sm:flex items-center gap-2 bg-bg border border-border text-textPrimary hover:border-primary px-4 py-2 rounded-xl text-sm font-bold transition-all"
              >
                <Plus size={18} />
                Post Gig
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-bold text-danger hover:bg-danger/10 px-4 py-2 rounded-xl transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
