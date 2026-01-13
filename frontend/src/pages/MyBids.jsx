import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBids } from "@/features/bids/bidsThunks";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send,
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Briefcase,
} from "lucide-react";

export default function MyBids() {
  const dispatch = useDispatch();
  const { myBids = [], loading } = useSelector((s) => s.bids || {});

  useEffect(() => {
    dispatch(fetchMyBids());
  }, [dispatch]);

  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-yellow-50 text-yellow-700",
    },
    hired: {
      label: "Hired",
      icon: CheckCircle,
      className: "bg-green-50 text-green-700",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "bg-red-50 text-red-600",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 py-6"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-textPrimary">
            My <span className="text-primary">Bids</span>
          </h1>
          <p className="text-textSecondary">
            Track all your proposals and their status
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary/20 transition"
        >
          <Briefcase size={16} />
          Browse Gigs
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-white rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && myBids.length === 0 && (
        <div className="bg-white rounded-3xl py-16 text-center space-y-4 shadow-sm">
          <Send size={40} className="mx-auto text-textSecondary" />
          <h3 className="text-xl font-black text-textPrimary">
            No bids yet
          </h3>
          <p className="text-textSecondary max-w-sm mx-auto">
            You haven’t applied to any gigs. Start bidding to see your activity
            here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20"
          >
            Browse Gigs
            <ArrowRight size={18} />
          </Link>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {myBids.map((bid, index) => {
          const status = statusConfig[bid.status] || statusConfig.pending;
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={bid._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm hover:shadow-lg transition"
            >
              {/* LEFT */}
              <div className="space-y-2 w-full">
                <h3 className="text-lg font-bold text-textPrimary">
                  {bid.gigId?.title || "Project"}
                </h3>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1 text-sm font-bold text-primary">
                    <IndianRupee size={14} />
                    {bid.price}
                  </div>

                  <span
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${status.className}`}
                  >
                    <StatusIcon size={14} />
                    {status.label}
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <Link
                to={`/gigs/${bid.gigId?._id}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                View Details
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
