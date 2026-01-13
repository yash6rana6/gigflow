import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "@/features/gigs/gigsThunks";
import GigCard from "@/components/GigCard";
import { motion } from "framer-motion";
import {
  Search,
  Briefcase,
  AlertTriangle,
  Loader2,
  XCircle,
} from "lucide-react";

export default function Gigs() {
  const dispatch = useDispatch();
  const { gigs = [], loading, error } = useSelector((state) => state.gigs || {});
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchGigs(search));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-10 py-6"
    >
      {/* ================= HEADER ================= */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-textPrimary tracking-tight">
          Browse <span className="text-primary">Gigs</span>
        </h1>
        <p className="text-lg text-textSecondary">
          Discover high-quality projects from verified clients.
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 bg-white rounded-3xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-primary/10 transition"
      >
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="text-textSecondary" size={20} />
          <input
            type="text"
            placeholder="Search gigs (React, UI/UX, Backend...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-4 bg-transparent outline-none font-medium text-textPrimary placeholder:text-textSecondary/50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primaryDark text-white px-10 py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 transition active:scale-95 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Searching…
            </>
          ) : (
            <>
              <Search size={20} />
              Find Jobs
            </>
          )}
        </button>
      </form>

      {/* ================= RESULTS HEADER ================= */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-black uppercase tracking-widest text-textPrimary">
          Available Gigs
        </h2>
        <span className="flex items-center gap-1 text-xs font-bold text-textSecondary bg-bg px-3 py-1 rounded-full">
          <Briefcase size={14} />
          {gigs.length} results
        </span>
      </div>

      {/* ================= STATES ================= */}

      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-white rounded-3xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 rounded-3xl p-8 text-center space-y-3">
          <AlertTriangle className="mx-auto text-red-500" />
          <p className="font-bold text-red-600">{error}</p>
          <button
            onClick={() => dispatch(fetchGigs())}
            className="text-primary font-bold"
          >
            Retry
          </button>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && gigs.length === 0 && (
        <div className="bg-white rounded-3xl py-20 text-center space-y-4">
          <XCircle className="mx-auto text-textSecondary" size={36} />
          <h3 className="text-xl font-black text-textPrimary">
            No gigs found
          </h3>
          <p className="text-textSecondary max-w-sm mx-auto">
            We couldn’t find gigs matching “{search}”.
          </p>
          <button
            onClick={() => {
              setSearch("");
              dispatch(fetchGigs(""));
            }}
            className="text-primary font-bold"
          >
            Clear search
          </button>
        </div>
      )}

      {/* ================= GRID ================= */}
      {!loading && !error && gigs.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
