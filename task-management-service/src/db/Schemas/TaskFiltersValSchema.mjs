import { Schema } from 'mongoose';
import { STATUS } from './constants.mjs';

const TaskFiltersValSchema = new Schema({
    title: {
        type: String,
        maxLength: 40
    },
    limit: {
        type: Number,
        min: [1, 'The minimal number cannot be less than 1'],
        max: [200, 'The maximal number cannot be greater than 200']
    },
    fromTime: {
        type: Date,
    },
    toTime: {
        type: Date
    },
    status: {
        type: String,
        enum: STATUS
    }
}, {
    timestamps: false,
    _id: false
})

// to prevent from saving in DB
TaskFiltersValSchema.pre('save', () => {throw new Error('Not savable document.')})

export default TaskFiltersValSchema;
