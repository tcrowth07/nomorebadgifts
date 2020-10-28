import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose'
import cors from 'cors'

import Question from './models/questions.js'
import questionsRoutes from './routes/questions.js'

//Connecting to MongoDB
const DBUri = 'mongodb+srv://tcrowth07:TOdWf8cItMMQ8Ye1@nomorebadgifts.ir5n8.mongodb.net/NoMoreBadGifts?retryWrites=true&w=majority'
mongoose.connect(DBUri, { useNewUrlParser: true, useUnifiedTopology: true })
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


app.get("/", (req, res) => {
  console.log("Get: Homepage");

  res.send("Home");
});