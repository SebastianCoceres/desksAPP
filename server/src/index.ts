import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Decks";

const PORT = 5000;

var app = express();

app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  res.send("Testing");
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
