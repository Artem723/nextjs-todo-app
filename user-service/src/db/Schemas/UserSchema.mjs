import { Schema } from 'mongoose'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        immutable: true,
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    login: {
        type: String,
        required: true,
        lowercase: true,
        immutable: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^([a-z]{1})[a-z0-9]{2,30}$/.test(v)
            },
            message: props => `${props.value} is not a valid login string: should contain lowercase latin characters and numbers and should not start from a number.`
        }
    },
    hashedPWD: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    lastLoginDate: Date
})

export default UserSchema;