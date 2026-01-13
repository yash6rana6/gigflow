import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGigs } from "@/features/gigs/gigsThunks";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  Plus,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function MyGigs() {
  const dispatch = useDispatch();
  const { myGigs = [], loading } = useSelector((s) => s.gigs || {});

  useEffect(() => {
    dispatch(fetchMyGigs());
  }, [dispatch]);

  const statusConfig = {
    open: {
      label: "Open",
      icon: Clock,
      className: "bg-yellow-50 text-yellow-700",
    },
    assigned: {
      label: "Assigned",
      icon: CheckCircle,
      className: "bg-green-50 text-green-700",
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
            My <span className="text-primary">Gigs</span>
          </h1>
          <p className="text-textSecondary">
            Manage your projects and review bids
          </p>
        </div>

        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 transition active:scale-95"
        >
          <Plus size={18} />
          Post New Gig
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
      {!loading && myGigs.length === 0 && (
        <div className="bg-white rounded-3xl py-16 text-center space-y-4 shadow-sm">
          <Briefcase size={42} className="mx-auto text-textSecondary" />
          <h3 className="text-xl font-black text-textPrimary">
            No gigs yet
          </h3>
          <p className="text-textSecondary max-w-sm mx-auto">
            You haven’t posted any gigs. Create one to start receiving bids.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 text-primary font-bold"
          >
            Create your first gig
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {myGigs.map((gig, index) => {
          const status = statusConfig[gig.status] || statusConfig.open;
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={gig._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm hover:shadow-lg transition"
            >
              {/* LEFT */}
              <div className="space-y-2 w-full">
                <h3 className="text-lg font-bold text-textPrimary">
                  {gig.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${status.className}`}
                  >
                    <StatusIcon size={14} />
                    {status.label}
                  </span>

                  <span className="text-xs font-semibold text-textSecondary">
                    ID: {gig._id.slice(-6).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <Link
                to={`/gigs/${gig._id}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Manage Bids
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
