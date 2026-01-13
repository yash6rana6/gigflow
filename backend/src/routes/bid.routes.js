import express from "express";
import {
  createBid,
  getBidsByGig,
  getMyBids,
  hireBid,
} from "../controllers/bid.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/", protect, createBid);
router.get("/my-bids", protect, getMyBids);
router.get("/:gigId", protect, getBidsByGig);
router.patch("/:bidId/hire", protect, hireBid);

export default router;
