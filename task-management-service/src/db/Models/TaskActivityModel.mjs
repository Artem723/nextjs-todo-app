import mongoose from "../connection.mjs";
import TaskActivitySchema from "../Schemas/TaskActivitySchema.mjs";

const TaskActivity = mongoose.model('TaskActivity', TaskActivitySchema);

export default TaskActivity;