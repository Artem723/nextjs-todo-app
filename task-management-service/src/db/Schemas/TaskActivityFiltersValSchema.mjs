import { Schema, Error } from 'mongoose';
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
        default: () => { return createDurationOfDays(DEFAULT_HISTORY_IN_DAYS) }
    },

}, {
    virtuals: {
        periodMills: {
            set (v) {
                if (typeof v !== 'number' || v < 0) {
                    this.invalidate('periodMills', `the provided value should be a positive integer. Instead ${v} is provided`, v)
                }
                this.fromTime = Date.now() - Math.floor(v);
            },
            get () {
                if (this.fromTime) {
                    return Date.now() - this.fromTime;
                } else {
                    return 0;
                }
            }
        }
    },
    timestamps: false,
    _id: false
})

// to prevent from saving in DB
TaskActivityFiltersValSchema.pre('save', () => { throw new Error('Not savable document.') })


function createDurationOfDays(days) {
    // Millis * sec * min * hours * days
    return 1000 * 60 * 60 * 24 * days;
}
export default TaskActivityFiltersValSchema;
