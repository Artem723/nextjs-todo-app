import { Schema } from '../connection.mjs';
import { STATUS } from './constants.mjs';


const TaskActivitySchema = new Schema({
    taskRef: {
        type: Schema.Types.ObjectId, ref: 'Task',
    },
    performedAt: {
        type: Date,
    },
    note: {
        type: String,
        maxLength: 1500,
        trim: true
    },
    prevStatus: {
        type: String,
        enum: STATUS
    },
    newStatus: {
        type: String,
        enum: STATUS
    },
    updatedAt: { //TODO: check, mb redundant
        type: Date,
    }
})

// Get activity list for a task.
