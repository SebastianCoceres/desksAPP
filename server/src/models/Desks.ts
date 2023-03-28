import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const TaskSchema = new Schema({
  title: String,
  description: String,
  checked: Boolean,
});

const DeskSchema = new Schema({
  title: String,
  tasks: {
    type: [TaskSchema],
    default: [],
  },
});

const DeskModel = mongoose.model("Desk", DeskSchema);

export default DeskModel;
