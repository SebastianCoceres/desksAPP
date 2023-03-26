import mongoose from "mongoose";
import TaskModel from "./Tasks";

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const DeskSchema = new Schema({
  title: String,
  tasks: [{ title: String, taskId: { type: Schema.Types.ObjectId, ref: 'Task' } }]
});

const DeskModel = mongoose.model("Desk", DeskSchema);

export default DeskModel;
