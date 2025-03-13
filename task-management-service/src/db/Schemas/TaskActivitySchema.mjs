import { Schema } from 'mongoose';
import { STATUS } from './constants.mjs';
import logger from '../../logger/index.mjs';
import TaskModel from '../Models/TaskModel.mjs'
import TaskActivityFiltersValModel from '../Models/TaskActivityFiltersValModel.mjs';



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
    updatedAt: { //TODO: check, mb redundant bc there are timestamps anyway
        type: Date,
    },
    userLogin: {
        type: String,
        required: true,
        immutable: true,

    },
    userRef: {
        type: Schema.Types.ObjectId,
        required: true,
        immutable: true,

    }
}, {
    timestamps: true
})



// Get activity list for a task.
TaskActivitySchema.statics.getActivityListForTaskId = async function (taskId, userId, filters) {
    if (!taskId ) {
        logger.error("taskId and/or userId was not specified.");
        return null;
    }

    // periodMills = periodMills || createDurationOfDays(DEFAULT_HISTORY_IN_DAYS);
    // const fromTime = new Date.now() - periodMills;
    
    let query = this.find({
        taskRef: taskId,
        userRef: userId
    });
    
    if (filters) {
        await validateTaskActivityFilters(filters);
        if (filters?.newStatus) query = query.where('newStatus').eq(filters.newStatus);
        if (filters?.fromTime) query = query.where('updatedAt').gt(filters.fromTime);
        if (filters?.limit) query = query.limit(filters.limit);

    }
    
    const activities = await query.exec();
    return activities;
}

async function validateTaskActivityFilters(filters) {
    
    const taskFilters = new TaskActivityFiltersValModel(filters)
    await taskFilters.validate();
    return null;

}



export default TaskActivitySchema;
