import { Schema } from 'mongoose'
import fs from 'node:fs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

const secretKey = fs.readFileSync('../../../secrets/private.key')

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
            message: (props) => `${props.value} is not valid email address.`
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

UserSchema.methods.generateToken = function() {
    return new Promise((resolve, reject) => {
        jwt.sign({ login: this.login }, secretKey, { expiresIn: 300 }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        })
    })
}

UserSchema.methods.stringify = function() {
    const responseUser = {
        login: this.login,
        name: this.name,
        email: this.email,
        creationDate: this.creationDate,
        lastLoginDate: this.lastLoginDate
    }
    return JSON.stringify(responseUser);  
}

UserSchema.static.verifyAndGetUserByToken = async function(token) {
    let decoded;
    const decodedPromise = new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        })
    })
    try {
        decoded = await decodedPromise;
    } catch(e) {
        console.log("Provided token is invalid!");
        return null;
    }
    
    return await this.findByLogin({ login: decoded?.login });
}

UserSchema.statics.findByLogin = function(login) {
    return this.findOne({ login: login })
}



function validatePlainPWD(pwd) {
    return /\w{6,30}/.test(pwd);
}

export default UserSchema;