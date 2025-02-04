import logger from '../../logger/index.mjs';
import { Schema } from '../connection.mjs';
import { REPEATED_ACTIVITY, STATUS, STATUS_OPEN } from './constants.mjs';

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30
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
    createdAt: {
        type: Date,
        default: Date.now
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

TaskSchema.statics.getTaskByIdForUser = async function(taskId, userId) {
    if (!taskId || !userId) {
        logger.error("The arguments 'taskId' and/or 'userId' were not specified.")
        return null;
    }
    const task = await this.findById(taskId);
    if (task?.userRef !== userId) {
        logger.info(`Task with ${taskId} was not found for user ${userId}.`);
        return null;
    }
    return task;
}

export default TaskSchema;

// UserSchema.methods.setPassword = async function (plainPWD) {
//     if (!validatePlainPWD(plainPWD))
//         throw new Error("Password should be at least 6 characters long containing letters and numbers!")
    
//     this.hashedPWD = await bcrypt.hash(plainPWD, SALT_ROUNDS);
// }

// UserSchema.methods.checkPWD = function(plainPWD) {
//     return bcrypt.compare(plainPWD, this.hashedPWD);
// }

// UserSchema.methods.generateToken = function() {
//     return new Promise((resolve, reject) => {
//         jwt.sign({ login: this.login }, secretKey, { expiresIn: "7d" }, (err, token) => {
//             if (err) reject(err);
//             resolve(token);
//         })
//     })
// }

// UserSchema.methods.stringify = function() {
//     const responseUser = {
//         login: this.login,
//         name: this.name,
//         email: this.email,
//         creationDate: this.creationDate,
//         lastLoginDate: this.lastLoginDate
//     }
//     return JSON.stringify(responseUser);  
// }

// UserSchema.statics.verifyAndGetUserByToken = async function(token) {
//     let decoded;
//     const decodedPromise = new Promise((resolve, reject) => {
//         jwt.verify(token, secretKey, (err, decoded) => {
//             if (err) reject(err);
//             resolve(decoded);
//         })
//     })
//     try {
//         decoded = await decodedPromise;
//     } catch(e) {
//         console.log("Provided token is invalid!");
//         return null;
//     }
    
//     return await this.findByLogin(decoded?.login);
// }