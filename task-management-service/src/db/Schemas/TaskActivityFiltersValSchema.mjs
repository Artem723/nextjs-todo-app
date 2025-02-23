import { Schema } from 'mongoose';
import { STATUS } from './constants.mjs';
import { DEFAULT_ACTIVITY_HISTORY_IN_DAYS } from './constants.mjs'
const TaskActivityFiltersValSchema = new Schema({
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

}, {
    virtuals: {
        periodMills: {
            set (v) {
            },
            get() {
                
            }
        }
    },
    timestamps: false,
    _id: false
})

// to prevent from saving in DB
TaskActivityFiltersValSchema.pre('save', () => {throw new Error('Not savable document.')})


function createDurationOfDays(days) {
    // Millis * sec * min * hours * days
    return 1000 * 60 * 60 * 24 * days;
}
export default TaskActivityFiltersValSchema;
