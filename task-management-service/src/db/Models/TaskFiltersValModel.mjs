import mongoose from "../connection.mjs";
import TaskFiltersValSchema from "../Schemas/TaskFiltersValSchema.mjs";

const TaskActivityVal = mongoose.model('TaskActivityVal', TaskFiltersValSchema);

export default TaskActivityVal;