import logger from '../../logger/index.mjs';
import { Schema } from 'mongoose';
import { REPEATED_ACTIVITY, STATUS, STATUS_OPEN } from './constants.mjs';
import TaskFiltersValModel from '../Models/TaskFiltersValModel.mjs';

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30,
        text: true
    },
    status: {
        type: String,
        enum: STATUS,
        required: true,
        default: STATUS_OPEN
    },
    color: {
        type: String,
        validate: {
            validator: (v) => {
                return true;
            },
            message: props => `${props.value} is not valid HTML color.`
        },
        default: TASK_COLOR_DEFAULT
    },
    notes: {
        type: String,
        maxLength: 1500,
        trim: true
    },
    repeatedActivityAt: {
        type: String,
        enum: REPEATED_ACTIVITY
    },
    completeBy: {
        type: Date
    },
    statusChangedAt: {
        type: Date,
    },
    activity: {
        type: Schema.Type.ObjectId,
        ref: 'TaskActivity'
    },
    // userLogin: {
    //     type: String,
    //     required: true,
    //     immutable: true,
        // some user fields if needed
    // },
    userRef: {
        type: Schema.Type.ObjectId,
        required: true,
        immutable: true,
        
    }
    // isCompleted: {
        // The completion can be in status
    // }
},{
    timestamps: true
})

TaskSchema.path('title').index({text: true});

TaskSchema.statics.getOneTaskByIdAndUserId = async function(taskId, userId) {
    if (!taskId || !userId) {
        logger.debug("The arguments 'taskId' and/or 'userId' were not specified.")
        return null;
    }
    const task = await this.findById(taskId);
    if (task?.userRef !== userId) {
        logger.debug(`Task with ${taskId} was not found for user ${userId}.`);
        return null;
    }
    return task;
}

TaskSchema.statics.deleteOneTaskByIdAndUserId = async function(taskId, userId) {
    const task = this.getOneTaskByIdAndUserId(taskId, userId);
    if (!task) {
        logger.debug(`Couldn't find a document with taskId: ${taskId}; userID: ${userId} for deletion.`)
        return null;
    }
    await task.deleteOne();
    return task;
}

TaskSchema.statics.getTasksByUserId = async function(userId, filters) {
    
    
    if (filters) await validateTaskFilters(filters);
    let query = this.find({'userRef': userId});
    
    if (filters?.title) query = query.where({'$text': {'$search': filters.title}});
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.fromTime) query = query.where('createdAt').gt(filters.fromTime);
    if (filters?.toTime) query = query.where('createdAt').lt(filters.toTime);
    if (filters?.status) query = query.where('status').eq(filters.status);

    
    const tasks = query.exec();
    return tasks;
}

async function validateTaskFilters(filters) {
    const taskFilters = new TaskFiltersValModel(filters)
    await taskFilters.validate();
    return null;
}

export default TaskSchema;