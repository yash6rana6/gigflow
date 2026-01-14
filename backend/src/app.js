import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import corsOptions from "./config/cors.js";

import authRoutes from "./routes/auth.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import bidRoutes from "./routes/bid.routes.js";

import notFound from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
  })
);


app.use(cors(corsOptions));  
app.use(express.json());
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);


app.use(notFound);             
app.use(errorMiddleware);       

export default app;
