import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  getDesks,
  createDesk,
  deleteDesk,
  editDesk,
} from "./controllers/desksController";

import { createTask } from "./controllers/tasksController";

const PORT = 5000;

var app = express();
app.use(
  cors({
    origin: "*", //sebastiancoceres.dev por ejemplo
  })
);
app.use(express.json());

app.get("/desks", getDesks);
app.get("/desks/:deskId", getDesks);
app.post("/desks", createDesk);
app.delete("/desks/:deskId", deleteDesk);
app.put("/desks/:deskId", editDesk);

app.post("/desks/:deskId/tasks", createTask);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
