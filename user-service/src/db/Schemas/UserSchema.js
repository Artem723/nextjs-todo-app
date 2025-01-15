import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        validate: {
            validator: (v) => {
                return true;
            },
            message: () => `${props.value} is not valid email address.`
        },
        required: [true, 'The email is required.']
    },
    hashedPassword: String,
    createdAt: Date,
    lastLogin: Date
});


export default userSchema;