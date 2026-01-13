import express from "express";
import {
  createGig,
  getGigs,
  getGigById,
  updateGig,
  deleteGig,
  getMyGigs,
} from "../controllers/gig.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getGigs);               // public
router.get("/my-gigs", protect, getMyGigs);
router.get("/:id", getGigById);         // public
router.post("/", protect, createGig);   // private
router.patch("/:id", protect, updateGig);
router.delete("/:id", protect, deleteGig);

export default router;
