import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";
import AppError from "../utils/AppError.js";

/* ================= REGISTER ================= */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return next(
        new AppError("Name, email and password are required", 400)
      );
    }

    //Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("User already exists", 409));
    }

    // Password strength
    if (password.length < 6) {
      return next(
        new AppError("Password must be at least 6 characters", 400)
      );
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password, 
    });

    // Send token
    sendToken(user, res);
  } catch (error) {
    next(error);
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email & password required", 400));
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid credentials", 401));
    }

    sendToken(user, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const sendToken = (user, res) => {
  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    status: "success",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};



