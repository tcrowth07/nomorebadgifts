import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

import questionsRoutes from "./routes/questions.js";
import typesRoutes from "./routes/types.js";
import giftRoutes from "./routes/gifts.js";
import userRoutes from "./routes/users.js";

//Connecting to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/questions", questionsRoutes);
app.use("/types", typesRoutes);
app.use("/gifts", giftRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
