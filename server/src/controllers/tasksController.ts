import { Request, Response } from "express";
import DeskModel from "../models/Desks";
import TaskModel from "../models/Tasks";

export async function createTask(req: Request, res: Response) {
  const deskId = req.params.deskId;
  const taskData = req.body;

  try {
    const desk = await DeskModel.findById(deskId);

    if (!desk) {
      return res.status(404).json({ error: "Escritorio no encontrado" });
    }

    const task = new TaskModel({
      title: taskData.title,
      desk: desk._id,
    });

    await task.save();

    desk.tasks.push({title: taskData.title, task: task._id});
    await desk.save();

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
