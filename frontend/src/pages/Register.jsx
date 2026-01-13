import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "@/features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  AlertTriangle,
  Loader2,
  UserPlus,
} from "lucide-react";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerThunk(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden py-10">
      
      {/* background accents */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-gray-200/50">
          
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <UserPlus className="text-white" size={22} />
            </div>
            <h2 className="text-3xl font-black text-textPrimary">
              Create your account
            </h2>
            <p className="text-sm text-textSecondary mt-1">
              Join GigFlow to hire or get hired
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* NAME */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-textSecondary tracking-widest ml-1">
                Full Name
              </label>
              <div className="flex items-center gap-3 bg-bg/60 rounded-2xl px-4 py-4 focus-within:ring-4 focus-within:ring-primary/10 transition">
                <User size={18} className="text-textSecondary" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none font-medium placeholder:text-textSecondary/40"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-textSecondary tracking-widest ml-1">
                Email
              </label>
              <div className="flex items-center gap-3 bg-bg/60 rounded-2xl px-4 py-4 focus-within:ring-4 focus-within:ring-primary/10 transition">
                <Mail size={18} className="text-textSecondary" />
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none font-medium placeholder:text-textSecondary/40"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-textSecondary tracking-widest ml-1">
                Password
              </label>
              <div className="flex items-center gap-3 bg-bg/60 rounded-2xl px-4 py-4 focus-within:ring-4 focus-within:ring-primary/10 transition">
                <Lock size={18} className="text-textSecondary" />
                <input
                  type="password"
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none font-medium placeholder:text-textSecondary/40"
                />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold"
              >
                <AlertTriangle size={16} />
                {error}
              </motion.div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primaryDark text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/25 transition active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                "Get Started"
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-textSecondary">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
