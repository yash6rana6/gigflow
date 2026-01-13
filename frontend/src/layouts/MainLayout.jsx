import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function MainLayout() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg font-bold text-textPrimary">
            Gig<span className="text-primary">Flow</span>
          </div>

          <p className="text-xs text-textSecondary text-center md:text-right">
            © {currentYear}{" "}
            <span className="font-semibold text-textPrimary">
              ServiceHive Tech
            </span>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
