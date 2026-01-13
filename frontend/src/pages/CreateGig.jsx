import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGig } from "@/features/gigs/gigsThunks";
import { motion } from "framer-motion";
import {
  FileText,
  AlignLeft,
  IndianRupee,
  AlertTriangle,
  Rocket,
  Loader2,
} from "lucide-react";

export default function CreateGig() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.gigs);

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      createGig({
        title: form.title,
        description: form.description,
        budget: Number(form.budget),
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4 py-12"
    >
      <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/60 overflow-hidden">
        
        {/* subtle accent */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full" />

        <div className="relative">
          <h1 className="text-3xl font-black text-textPrimary tracking-tight">
            Create a <span className="text-primary">New Gig</span>
          </h1>
          <p className="text-textSecondary mt-2 mb-8">
            Describe your project and start receiving bids.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* TITLE */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-textPrimary">
                <FileText size={16} />
                Gig Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Build a modern React dashboard"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-2xl bg-bg/50 px-5 py-4 outline-none border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 transition placeholder:text-textSecondary/50"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-textPrimary">
                <AlignLeft size={16} />
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                placeholder="Explain scope, skills required, expectations…"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full rounded-2xl bg-bg/50 px-5 py-4 outline-none border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 transition resize-none placeholder:text-textSecondary/50"
              />
            </div>

            {/* BUDGET */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-textPrimary">
                <IndianRupee size={16} />
                Budget
              </label>
              <input
                type="number"
                name="budget"
                placeholder="5000"
                value={form.budget}
                onChange={handleChange}
                min={1}
                required
                className="w-full rounded-2xl bg-bg/50 px-5 py-4 text-lg font-bold text-primary outline-none border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
              />
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
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primaryDark text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/30 transition active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Publishing…
                </>
              ) : (
                <>
                  <Rocket size={20} />
                  Launch Gig
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
