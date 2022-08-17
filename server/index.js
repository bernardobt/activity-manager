import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

/* import routes that will be used */
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

/* optional */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* cors */
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

/* used routes */

app.use("/users", userRoutes);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(`Error: ${error.message}`));
