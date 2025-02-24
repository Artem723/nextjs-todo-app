import mongoose from "../connection.mjs";
import TaskSchema from "../Schemas/TaskSchema.mjs";

const Task = mongoose.model('Task', TaskSchema);

export default Task;