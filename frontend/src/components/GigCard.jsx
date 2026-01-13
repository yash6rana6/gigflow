// src/components/GigCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IndianRupee, User, ArrowRight } from "lucide-react";

export default function GigCard({ gig }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260 }}
    >
      <Link
        to={`/gigs/${gig._id}`}
        className="group block bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all"
      >
        <div className="flex justify-between gap-6">
          
          {/* LEFT */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-textPrimary group-hover:text-primary transition-colors">
              {gig.title}
            </h3>

            <p className="text-sm text-textSecondary leading-relaxed line-clamp-2">
              {gig.description}
            </p>

            {/* OWNER */}
            <div className="flex items-center gap-2 pt-1">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {gig.ownerId?.name?.charAt(0) || <User size={14} />}
              </div>
              <span className="text-xs text-textSecondary">
                by{" "}
                <span className="font-semibold text-textPrimary">
                  {gig.ownerId?.name}
                </span>
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end justify-between">
            
            {/* STATUS */}
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
              Open
            </span>

            {/* BUDGET */}
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-textSecondary font-semibold">
                Budget
              </p>
              <div className="flex items-center gap-1 text-2xl font-black text-primary">
                <IndianRupee size={16} />
                {gig.budget}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACTION */}
        <div className="mt-5 flex items-center justify-end text-primary text-sm font-semibold gap-1 opacity-0 group-hover:opacity-100 transition">
          View Details
          <ArrowRight size={16} />
        </div>
      </Link>
    </motion.div>
  );
}
