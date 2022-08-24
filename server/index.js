import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";

/* import routes that will be used */
// import V1UserRouter from "./v1/routes/userRoutes.js";
// import V1AuthRouter from "./v1/routes/authRoutes.js";

import RegisterRouterV1 from "./v1/routes/registerRoutes.js";
import AuthRouterV1 from "./v1/routes/authRoutes.js";
import RefreshRouterV1 from "./v1/routes/refreshTokenRoutes.js";
import LogoutRouterV1 from "./v1/routes/logoutRoutes.js";

const app = express();
dotenv.config();

/* cors */
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  })
);

app.use(cookieParser());
// /* optional */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));

// middleware for cookies

/* used routes */

// app.use("/api/v1/users", V1UserRouter);
// app.use("/api/v1/login", V1AuthRouter);

app.use("/api/v1/register", RegisterRouterV1);
app.use("/api/v1/login", AuthRouterV1);
app.use("/api/v1/refresh", RefreshRouterV1);
app.use("/api/v1/logout", LogoutRouterV1);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(`Error: ${error.message}`));
