import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const DeskSchema = new Schema({
  title: String,
});

const DeskModel = mongoose.model("Desk", DeskSchema);

export default DeskModel;
