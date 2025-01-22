import mongoose from "../connection.mjs";
import UserSchema from "../Schemas/UserSchema.mjs";

const model = mongoose.model('User', UserSchema);

export default model;