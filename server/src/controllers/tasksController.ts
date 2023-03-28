import { Request, Response } from "express";
import DeskModel from "../models/Desks";
// import TaskModel from "../models/Tasks";
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

    desk.tasks.push({
      title: taskData.title,
      description: taskData.description,
      checked: taskData.checked,
    });
    await desk.save();

    return res.status(201).json(desk.tasks);
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
        .json({ error: `There is no desk with id: ${deskId}` });
    }

    const taskIndex = desk.tasks.findIndex(
      (task) => task._id?.toString() === taskId.toString()
    );

    if (taskIndex === -1) {
      return res
        .status(404)
        .json({ error: `There is no task with id: ${taskId}` });
    }

    await DeskModel.findByIdAndUpdate(
      deskId,
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );

    res.json({ message: `successfully deleted task with id: ${taskId}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function editTask(req: Request, res: Response) {
  const deskId = req.params.deskId;
  const taskId = req.params.taskId;
  const taskData = {
    _id: taskId,
    title: req.body.title,
    description: req.body.description,
    checked: req.body.checked,
  };

  try {
    const desk = await DeskModel.findById(deskId);

    if (!desk) {
      return res
        .status(404)
        .json({ error: `There is no desk with id: ${deskId}` });
    }

    const taskIndex = desk.tasks.findIndex(
      (task) => task._id?.toString() === taskId.toString()
    );

    if (taskIndex === -1) {
      return res
        .status(404)
        .json({ error: `There is no task with id: ${taskId}` });
    }

    const taskUpdated = await DeskModel.findByIdAndUpdate(
      deskId,
      { $set: { [`tasks.${taskIndex}`]: taskData } },
      { new: true }
    );

    if (taskUpdated) {
      res.json({
        message: `Task with id ${taskId} successfully updated`,
        task: taskUpdated.tasks,
      });
    } else {
      res.status(404).json({ error: `Task with id ${taskId} not found` });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
