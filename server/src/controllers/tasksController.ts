import { Request, Response } from "express";
import DeskModel from "../models/Desks";
import TaskModel from "../models/Tasks";
import { Types } from "mongoose";

export async function createTask(req: Request, res: Response) {
  const deskId = req.params.deskId;
  const taskData = req.body;

  try {
    const desk = await DeskModel.findById(deskId);

    if (!desk) {
      return res
        .status(404)
        .json({ error: `There is no desk with id: ${req.params.deskId}` });
    }

    const task = new TaskModel({
      title: taskData.title,
      description: taskData.description,
      checked: taskData.checked,
      desk: desk._id,
    });

    await task.save();
    desk.tasks.push({ title: taskData.title, taskId: task._id });
    await desk.save();

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteTask(req: Request, res: Response) {
  const deskId = req.params.deskId;
  const taskId = req.params.taskId;

  try {
    const desk = await DeskModel.findById(deskId);
    if (!desk) {
      return res
        .status(404)
        .json({ error: `There is no desk with id: ${req.params.deskId}` });
    }
    desk.tasks = desk.tasks.filter((el) => {
      return !new Types.ObjectId(el.taskId).equals(taskId);
    });

    await desk.save();
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    if (deletedTask) {
      res.json({
        message: `successfully deleted task with id: ${taskId}`,
        deletedTask,
      });
    } else {
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
