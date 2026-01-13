import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGigs } from "@/features/gigs/gigsThunks";
import { fetchMyBids } from "@/features/bids/bidsThunks";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle,
  FolderOpen,
  Send,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, checked } = useSelector((s) => s.auth);
  const { myGigs = [], loading: gigsLoading } = useSelector((s) => s.gigs || {});
  const { myBids = [], loading: bidsLoading } = useSelector((s) => s.bids || {});

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchMyGigs());
      dispatch(fetchMyBids());
    }
  }, [dispatch, user?.id]);

  if (!checked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const openGigs = myGigs.filter((g) => g.status === "open");
  const assignedGigs = myGigs.filter((g) => g.status === "assigned");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-10 py-6"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-textPrimary">
            Welcome back,{" "}
            <span className="text-primary">{user?.name}</span>
          </h1>
          <p className="text-textSecondary mt-1">
            Track your gigs and bids from one place.
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

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Projects"
          value={myGigs.length}
          icon={FolderOpen}
          color="text-blue-600 bg-blue-50"
        />
        <StatCard
          label="Live Gigs"
          value={openGigs.length}
          icon={Briefcase}
          color="text-green-600 bg-green-50"
        />
        <StatCard
          label="Assigned"
          value={assignedGigs.length}
          icon={CheckCircle}
          color="text-purple-600 bg-purple-50"
        />
        <StatCard
          label="My Bids"
          value={myBids.length}
          icon={Send}
          color="text-orange-600 bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT GIGS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-sm font-black tracking-widest text-textPrimary uppercase">
              Recent Gigs
            </h2>
            <Link
              to="/my-gigs"
              className="text-sm font-bold text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm divide-y">
            {gigsLoading ? (
              <div className="p-10 text-center text-textSecondary">
                Loading your gigs…
              </div>
            ) : myGigs.length === 0 ? (
              <div className="p-10 text-center space-y-3">
                <p className="text-textSecondary">
                  You haven’t posted any gigs yet.
                </p>
                <Link
                  to="/create"
                  className="text-primary font-bold"
                >
                  Create your first gig →
                </Link>
              </div>
            ) : (
              myGigs.slice(0, 4).map((gig) => (
                <motion.div
                  whileHover={{ x: 4 }}
                  key={gig._id}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <p className="font-bold text-textPrimary">
                      {gig.title}
                    </p>
                    <span
                      className={`text-[11px] font-bold uppercase ${
                        gig.status === "open"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {gig.status}
                    </span>
                  </div>

                  <Link
                    to={`/gigs/${gig._id}`}
                    className="p-2 rounded-xl hover:bg-bg transition"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-4">
          <h2 className="text-sm font-black tracking-widest uppercase text-textPrimary px-1">
            Quick Links
          </h2>

          <QuickLink
            to="/my-bids"
            title="My Bids"
            subtitle="Track your applications"
            icon={Send}
          />
          <QuickLink
            to="/my-gigs"
            title="My Gigs"
            subtitle="Manage your projects"
            icon={Briefcase}
          />
          <QuickLink
            to="/"
            title="Browse Gigs"
            subtitle="Find new work"
            icon={FolderOpen}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* SUB COMPONENTS */

const StatCard = ({ label, value, icon: Icon, color }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
  >
    <div
      className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}
    >
      <Icon size={22} />
    </div>
    <p className="text-xs font-bold tracking-widest uppercase text-textSecondary">
      {label}
    </p>
    <p className="text-3xl font-black text-textPrimary">{value}</p>
  </motion.div>
);

const QuickLink = ({ title, subtitle, to, icon: Icon }) => (
  <Link
    to={to}
    className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
  >
    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
      <Icon size={20} />
    </div>
    <div>
      <p className="font-bold text-textPrimary">{title}</p>
      <p className="text-xs text-textSecondary">{subtitle}</p>
    </div>
  </Link>
);
