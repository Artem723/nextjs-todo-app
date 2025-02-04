import mongoose from "../connection.mjs";
import TaskActivitySchema from "../Schemas/TaskActivitySchema.mjs";

const model = mongoose.model('TaskActivity', TaskActivitySchema);

export default model;