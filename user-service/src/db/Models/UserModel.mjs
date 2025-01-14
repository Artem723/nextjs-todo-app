import mongoose from "mongoose";
import UserSchema from "../Schemas/UserSchema.mjs";

const model = mongoose.model('User', UserSchema);

export default model;