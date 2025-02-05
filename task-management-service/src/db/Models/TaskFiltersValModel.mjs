import mongoose from "../connection.mjs";
import TaskFiltersValSchema from "../Schemas/TaskFiltersValSchema.mjs";

const model = mongoose.model('TaskActivity', TaskFiltersValSchema);

// to prevent saving the instances
model.prototype.save = null;
export default model;