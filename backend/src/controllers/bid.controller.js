import mongoose from "mongoose";
import Bid from "../models/Bid.model.js";
import Gig from "../models/Gig.model.js";
import AppError from "../utils/AppError.js";
import { getIO } from "../socket.js";

export const createBid = async (req, res, next) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !price) {
      return next(new AppError("Gig ID and price are required", 400));
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return next(new AppError("Gig not found", 404));
    }

    if (gig.status !== "open") {
      return next(new AppError("This gig is no longer open", 400));
    }

    if (gig.ownerId.toString() === req.user._id.toString()) {
      return next(new AppError("You cannot bid on your own gig", 403));
    }

    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id,
    });

    if (existingBid) {
      return next(
        new AppError("You have already placed a bid on this gig", 409)
      );
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });

    res.status(201).json({
      status: "success",
      data: bid,
    });
  } catch (error) {
    next(error);
  }
};

export const getBidsByGig = async (req, res, next) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return next(new AppError("Gig not found", 404));
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return next(
        new AppError("You are not authorized to view these bids", 403)
      );
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: bids.length,
      data: bids,
    });
  } catch (error) {
    next(error);
  }
};

export const hireBid = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      return next(new AppError("Bid not found", 404));
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      return next(new AppError("Gig not found", 404));
    }

    // Only gig owner can hire
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return next(
        new AppError("You are not authorized to hire for this gig", 403)
      );
    }

    // Prevent double hiring
    if (gig.status === "assigned") {
      return next(new AppError("This gig has already been assigned", 400));
    }

    // Update gig status
    gig.status = "assigned";
    await gig.save({ session });

    // Hire selected bid
    bid.status = "hired";
    await bid.save({ session });

    // Reject other bids
    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bid._id },
      },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();

    const io = getIO();

    io.to(bid.freelancerId.toString()).emit("hired", {
      message: `You have been hired for: ${gig.title}`,
      gigId: gig._id,
    });
    session.endSession();

    res.status(200).json({
      status: "success",
      message: "Freelancer hired successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

/* ================= MY BIDS ================= */
// GET /api/bids/my-bids
export const getMyBids = async (req, res, next) => {
  try {
    const bids = await Bid.find({
      freelancerId: req.user._id,
    })
      .populate("gigId", "title budget status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: bids.length,
      data: bids,
    });
  } catch (error) {
    next(error);
  }
};
