import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config.js'

import questionsRoutes from './routes/questions.js'

//Connecting to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('Connected to DB'))
    .catch((err) => console.log(err))
    
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/questions", questionsRoutes)

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
