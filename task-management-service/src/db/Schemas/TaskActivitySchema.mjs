import { Schema } from '../connection.mjs';
import { STATUS } from './constants.mjs';
import logger from '../../logger/index.mjs';
import TaskModel from '../Models/TaskModel.mjs'

const DEFAULT_HISTORY_IN_DAYS = 30;

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
    },
    userLogin: {
        type: String,
        required: true,
        immutable: true,

    },
    userRef: {
        type: Schema.Type.ObjectId,
        required: true,
        immutable: true,

    }
}, {
    timestamps: true
})

// Get activity list for a task.
TaskActivitySchema.statics.getActivityListForTaskId = async function (taskId, userId, periodMills) {
    if (!taskId) {
        logger.error("Task ID was not specified.");
        return null;
    }
    const task = await TaskModel.getOneTaskByIdAndUserId(taskId, userId);
    if (!task) return null;

    periodMills = periodMills || createDurationOfDays(DEFAULT_HISTORY_IN_DAYS);
    const fromTime = new Date.now() - periodMills;

    const activities = await this.find({
        taskRef: taskId,
        performedAt: { $gte: fromTime }
    }).exec();
    return activities;
}

function createDurationOfDays(days) {
    // Millis * sec * min * hours * days
    return 1000 * 60 * 60 * 24 * days;
}

export default TaskActivitySchema;
