import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/auth.routes.js";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
//  load the environment variable
dotenv.config();
const DBURL = process.env.DATABASE_URL;

// Establish connection to MongoDB
connectDB(DBURL);

app.use(express.json());

//? Setup the User Router
app.use("/api/v1/users", usersRouter);

const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
