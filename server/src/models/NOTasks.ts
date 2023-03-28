import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  description: String,
  checked: Boolean,
  desk: {
    title: String,
    deskId: {
      type: Schema.Types.ObjectId,
      ref: "Desk",
    },
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
