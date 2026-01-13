import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchGigById,
} from "@/features/gigs/gigsThunks";
import {
  createBid,
  fetchBidsByGig,
  hireBid,
} from "@/features/bids/bidsThunks";
import BidCard from "@/components/BidCard";
import {
  User,
  IndianRupee,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentGig, loading } = useSelector((s) => s.gigs);
  const { bids = [], loading: bidsLoading } = useSelector((s) => s.bids || {});
  const { user } = useSelector((s) => s.auth);

  const [bidForm, setBidForm] = useState({ message: "", price: "" });

  const isOwner = user && currentGig?.ownerId?._id === user.id;

  useEffect(() => {
    dispatch(fetchGigById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isOwner) {
      dispatch(fetchBidsByGig(id));
    }
  }, [dispatch, id, isOwner]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      createBid({
        gigId: id,
        message: bidForm.message,
        price: Number(bidForm.price),
      })
    );
    setBidForm({ message: "", price: "" });
  };

  const handleHire = async (bidId) => {
    await dispatch(hireBid(bidId));
  };

  if (loading || !currentGig) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-textSecondary font-medium">
          Loading project details…
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 py-10 space-y-10"
    >
      {/* ================= HEADER ================= */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm relative">
        <span
          className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
            currentGig.status === "open"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {currentGig.status}
        </span>

        <div className="max-w-3xl space-y-5">
          <h1 className="text-4xl font-black text-textPrimary">
            {currentGig.title}
          </h1>

          <p className="text-lg text-textSecondary leading-relaxed">
            {currentGig.description}
          </p>

          <div className="flex flex-wrap gap-8 pt-6 border-t border-border">
            <InfoBlock
              icon={User}
              label="Client"
              value={currentGig.ownerId?.name}
            />
            <InfoBlock
              icon={IndianRupee}
              label="Budget"
              value={`₹${currentGig.budget}`}
              highlight
            />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">
          {isOwner && (
            <>
              <h2 className="text-sm font-black uppercase tracking-widest text-textPrimary px-1">
                Bids Received ({bids.length})
              </h2>

              <AnimatePresence>
                {bidsLoading ? (
                  <p className="text-center py-10 text-textSecondary">
                    Loading bids…
                  </p>
                ) : bids.length === 0 ? (
                  <div className="rounded-3xl bg-bg/60 p-10 text-center text-textSecondary">
                    No bids yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bids.map((bid) => (
                      <BidCard
                        key={bid._id}
                        bid={bid}
                        isOwner={isOwner}
                        gigStatus={currentGig.status}
                        onHire={handleHire}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </>
          )}

          {!user && (
            <div className="bg-primary/5 rounded-3xl p-8 text-center">
              <p className="font-bold text-textPrimary mb-4">
                Want to apply for this gig?
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
              >
                Login to Bid
              </button>
            </div>
          )}
        </div>

        {/* ================= RIGHT ================= */}
        {!isOwner && user && currentGig.status === "open" && (
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 sticky top-24 shadow-xl">
              <h2 className="text-xl font-black text-textPrimary mb-6">
                Submit Proposal
              </h2>

              <form onSubmit={handleBidSubmit} className="space-y-5">
                <textarea
                  placeholder="Describe your experience and approach…"
                  value={bidForm.message}
                  onChange={(e) =>
                    setBidForm({ ...bidForm, message: e.target.value })
                  }
                  required
                  className="w-full rounded-2xl bg-bg px-4 py-4 min-h-140px outline-none focus:ring-4 focus:ring-primary/10 transition"
                />

                <input
                  type="number"
                  placeholder="Proposed price"
                  value={bidForm.price}
                  onChange={(e) =>
                    setBidForm({ ...bidForm, price: e.target.value })
                  }
                  required
                  className="w-full rounded-2xl bg-bg px-4 py-4 font-bold text-primary outline-none focus:ring-4 focus:ring-primary/10 transition"
                />

                <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primaryDark text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 transition active:scale-95">
                  <Send size={18} />
                  Submit Proposal
                </button>

                <p className="text-[10px] text-center text-textSecondary">
                  <ShieldCheck size={12} className="inline mr-1" />
                  Payments are protected by platform escrow.
                </p>
              </form>
            </div>
          </aside>
        )}
      </div>
    </motion.div>
  );
}

/* ================= SUB COMPONENT ================= */

const InfoBlock = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex items-center gap-3">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
        highlight ? "bg-primary/10 text-primary" : "bg-bg text-textSecondary"
      }`}
    >
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-textSecondary">
        {label}
      </p>
      <p
        className={`font-bold ${
          highlight ? "text-primary text-xl" : "text-textPrimary"
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);
