import express from 'express'
import logger from './logger/index.mjs';
import { placeUserData } from './middlewares.mjs';
import cookieParser from 'cookie-parser';
import TaskModel from './db/Models/TaskModel.mjs'
import { TASK_COLOR_DEFAULT } from './db/Schemas/constants.mjs';
import mongoose from './db/connection.mjs';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/tasks', placeUserData, async (req, res) => {
    const { userId } = res.locals;
    const task = new TaskModel();
    const body = req.body || {};

    task.title = body.title;
    task.color = body.color || TASK_COLOR_DEFAULT;
    task.notes = body.notes || null;
    task.repeatedActivityAt = body.repeatedActivityAt || null;
    task.completeBy = body.completeBy || null;
    task.userRef = userId;
    try {
        await task.save();
    } catch(e) {
        if(e instanceof mongoose.Error.ValidationError) {
            logger.error(`Task validation failed: ${e.errors}`)
            res.status(400).end(JSON.stringify(e.errors));
        } else {
            logger.error('Not possible to save a new task to the DB');
            logger.error(e)
            res.status(500).end();
        }
        return;
    }
    res.end(JSON.stringify(task));
})
// TODO add query by date
app.get('/tasks', placeUserData, (req, res) => {
    const { userId } = res.locals;
    // parse the querystring
    const tasks = TaskModel.getTasksByUserId(userId);
    throw new Error('Not implemented!');
})

app.get('/tasks/:id', placeUserData, (req, res) => {
    throw new Error('Not implemented!');
})

app.patch('/task/:id', placeUserData, (req, res) => {
    throw new Error('Not implemented!');
})

app.delete('/task/:id', placeUserData, (req, res) => {
    throw new Error('Not implemented!');
})