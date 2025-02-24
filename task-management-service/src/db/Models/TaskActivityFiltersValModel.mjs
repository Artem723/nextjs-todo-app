import mongoose from "../connection.mjs";
import TaskActivityFiltersValSchema from "../Schemas/TaskActivityFiltersValSchema.mjs";

const TaskActivityFiltersValModel = mongoose.model('TaskActivityFiltersVal', TaskActivityFiltersValSchema);

export default TaskActivityFiltersValModel;