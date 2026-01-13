import { motion } from "framer-motion";
import {
  IndianRupee,
  CheckCircle2,
  XCircle,
  Clock,
  User,
} from "lucide-react";

export default function BidCard({ bid, isOwner, gigStatus, onHire }) {
  const statusConfig = {
    pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      badge: "Pending",
      icon: Clock,
    },
    hired: {
      bg: "bg-green-50",
      text: "text-green-600",
      badge: "Hired",
      icon: CheckCircle2,
    },
    rejected: {
      bg: "bg-red-50",
      text: "text-red-600",
      badge: "Rejected",
      icon: XCircle,
    },
  };

  const currentStatus = statusConfig[bid.status] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl p-6 ${currentStatus.bg} shadow-sm hover:shadow-md transition`}
    >
      <div className="flex flex-col md:flex-row justify-between gap-6">
        
        {/* LEFT : Freelancer Info */}
        <div className="flex gap-4">
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center font-bold text-primary shadow">
            {bid.freelancerId?.name?.charAt(0) || <User size={18} />}
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-textPrimary">
              {bid.freelancerId?.name || "Freelancer"}
            </h4>
            <p className="text-sm text-textSecondary leading-relaxed max-w-md">
              {bid.message}
            </p>
          </div>
        </div>

        {/* RIGHT : Price + Actions */}
        <div className="flex flex-col items-end justify-between gap-4">
          
          {/* PRICE */}
          <div className="text-right">
            <p className="text-xs uppercase text-textSecondary font-semibold">
              Proposed Price
            </p>
            <div className="flex items-center gap-1 justify-end text-primary font-black text-2xl">
              <IndianRupee size={18} />
              {bid.price}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            
            {/* STATUS */}
            <span
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-white ${currentStatus.text}`}
            >
              <StatusIcon size={14} />
              {currentStatus.badge}
            </span>

            {/* HIRE BUTTON */}
            {isOwner && gigStatus === "open" && bid.status === "pending" && (
              <button
                onClick={() => onHire(bid._id)}
                className="bg-primary hover:bg-primaryDark text-white px-5 py-2 rounded-xl text-sm font-bold shadow shadow-primary/20 transition active:scale-95"
              >
                Hire
              </button>
            )}
          </div>
        </div>
      </div>

      {/* HIRED DECOR */}
      {bid.status === "hired" && (
        <div className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded-lg rotate-12">
          SELECTED
        </div>
      )}
    </motion.div>
  );
}
