import Gig from "../models/Gig.model.js";
import AppError from "../utils/AppError.js";

/* ================= CREATE GIG ================= */
// POST /api/gigs
export const createGig = async (req, res, next) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return next(
        new AppError("Title, description and budget are required", 400)
      );
    }

    if (budget <= 0) {
      return next(
        new AppError("Budget must be greater than zero", 400)
      );
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: gig,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET ALL OPEN GIGS ================= */
// GET /api/gigs?search=react
export const getGigs = async (req, res, next) => {
  try {
    const { search } = req.query;

    const query = {
      status: "open",
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const gigs = await Gig.find(query)
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: gigs.length,
      data: gigs,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET SINGLE GIG ================= */
// GET /api/gigs/:id
export const getGigById = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "ownerId",
      "name email"
    );

    if (!gig) {
      return next(new AppError("Gig not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: gig,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= UPDATE GIG ================= */
// PATCH /api/gigs/:id
export const updateGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(new AppError("Gig not found", 404));
    }

    // Only owner can update
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return next(
        new AppError("You are not authorized to update this gig", 403)
      );
    }

    // Prevent updates after assignment
    if (gig.status === "assigned") {
      return next(
        new AppError("Assigned gigs cannot be updated", 400)
      );
    }

    const allowedFields = ["title", "description", "budget"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        gig[field] = req.body[field];
      }
    });

    await gig.save();

    res.status(200).json({
      status: "success",
      data: gig,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= DELETE GIG ================= */
// DELETE /api/gigs/:id
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(new AppError("Gig not found", 404));
    }

    // Only owner can delete
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return next(
        new AppError("You are not authorized to delete this gig", 403)
      );
    }

    // Prevent delete after assignment
    if (gig.status === "assigned") {
      return next(
        new AppError("Assigned gigs cannot be deleted", 400)
      );
    }

    await gig.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Gig deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


/* ================= MY GIGS ================= */
// GET /api/gigs/my-gigs
export const getMyGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find({
      ownerId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: gigs.length,
      data: gigs,
    });
  } catch (error) {
    next(error);
  }
};
