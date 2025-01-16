import { Schema } from 'mongoose'
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

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
        immutable: true,
        validate: {
            validator: (v) => {
                return /^([a-z]{1})[a-z0-9]{2,30}$/.test(v)
            },
            message: props => `${props.value} is not a valid login string: \
            should contain lowercase latin characters and numbers and should not start from a number.`
        }
    },
    email: {
        type: String,
        validate: {
            validator: (v) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: () => `${props.value} is not valid email address.`
        },
        required: [true, 'The email is required.']
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

UserSchema.methods.setPassword = async function (plainPWD) {
    if (!validatePlainPWD(plainPWD))
        throw new Error("Password should be at least 6 characters long containing letters and numbers!")
    
    this.hashedPWD = await bcrypt.hash(plainPWD, SALT_ROUNDS);
}

UserSchema.methods.checkPWD = function(plainPWD) {
    return bcrypt.compare(plainPWD, this.hashedPWD);
}

UserSchema.statics.findByLogin = function(login) {
    return this.findOne()
}

function validatePlainPWD(pwd) {
    return /\w{6,30}/.test(pwd);
}

export default UserSchema;