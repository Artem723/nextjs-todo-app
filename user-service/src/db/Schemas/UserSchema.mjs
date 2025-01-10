import { Schema } from 'mongoose'

const UserSchema = new Schema({
    name: String,
    login: String,
    hashedPWD: String,
    creationDate: {
        type: Date,
        default: Date.now
    },
    lastLoginDate: Date
})

export default UserSchema;