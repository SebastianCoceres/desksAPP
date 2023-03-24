import { Request, Response } from "express";
import DeskModel from "../models/Desks";

export async function getDesks(req: Request, res: Response) {
  const desks = await DeskModel.find();
  res.json(desks);
}

export async function getDesksById(req: Request, res: Response) {
  const desks = await DeskModel.findById(req.params.deskId);
  res.json(desks);
}

export async function createDesk(req: Request, res: Response) {
  const newDesk = new DeskModel({
    title: req.body.title || "no title",
  });
  const createdDesk = await newDesk.save();
  res.json(createdDesk);
}

export async function deleteDesk(req: Request, res: Response) {
  const deskId = req.params.deskId;
  const deletedDesk = await DeskModel.findByIdAndDelete(deskId);
  res.json({
    message: "successfully deleted desk",
    deletedDesk,
  });
}
export async function editDesk(req: Request, res: Response) {
  const deskId = req.params.deskId;
  const updatedDesk = await DeskModel.findByIdAndUpdate(deskId, {
    title: req.body.title,
  });
  res.json({
    message: "successfully updated desk",
    updatedDesk,
  });
}
