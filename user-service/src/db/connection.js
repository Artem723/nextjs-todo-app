import mongoose from 'mongoose'
import { readFileSync } from 'node:fs'
import process from 'node:process'


const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME_FILE,
    DB_PASSWORD_FILE
} = process.env;

const dbUsername = readFileSync(DB_USERNAME_FILE, 'utf-8');
const dbPassword = readFileSync(DB_PASSWORD_FILE, 'utf-8');

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}`)

export default mongoose;