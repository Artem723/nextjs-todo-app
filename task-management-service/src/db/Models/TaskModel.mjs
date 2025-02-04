import mongoose from "../connection.mjs";
import TaskSchema from "../Schemas/TaskSchema.mjs";

const model = mongoose.model('Task', TaskSchema);

export default model;