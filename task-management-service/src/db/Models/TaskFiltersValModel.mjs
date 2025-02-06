import mongoose from "../connection.mjs";
import TaskFiltersValSchema from "../Schemas/TaskFiltersValSchema.mjs";

const model = mongoose.model('TaskActivity', TaskFiltersValSchema);

export default model;