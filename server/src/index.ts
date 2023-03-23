import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeskModel from "./models/Desks";
import cors from "cors";

const PORT = 5000;

var app = express();
app.use(
  cors({
    origin: "*", //sebastiancoceres.dev por ejemplo
  })
);
app.use(express.json());

app.get("/desks", async (req: Request, res: Response) => {
  const desks = await DeskModel.find();
  res.json(desks);
});

app.post("/desks", async (req: Request, res: Response) => {
  const newDesk = new DeskModel({
    title: req.body.title || "no title",
  });
  const createdDesk = await newDesk.save();
  res.json(createdDesk);
});

app.delete("/desks/:deskId", async (req: Request, res: Response) => {
  const deskId = req.params.deskId;
  const deletedDesk = await DeskModel.findByIdAndDelete(deskId);
  res.json({
    message: "successfully deleted desk",
    deletedDesk,
  });
});

app.put("/desks/:deskId", async (req: Request, res: Response) => {
  const deskId = req.params.deskId;
  const updatedDesk = await DeskModel.findByIdAndUpdate(deskId, {
    title: req.body.title,
  });
  res.json({
    message: "successfully updated desk",
    updatedDesk,
  });
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
