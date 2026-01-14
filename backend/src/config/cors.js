const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://gigflow-ruby.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
   
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,      
  maxAge: 600,           
};

export default corsOptions;
