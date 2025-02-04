import express from 'express'
import logger from './logger/index.mjs';
import { placeUserData } from './middlewares.mjs';
import cookieParser from 'cookie-parser';
import TaskModel from './db/Models/TaskModel.mjs'
import { TASK_COLOR_DEFAULT } from './db/Schemas/constants.mjs';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/tasks/add', placeUserData, async (req, res) => {
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
        await task.validate();
    } catch(e) {
        logger.info('Task validation failed')
        res.status(400).end('Bad request.');
        return;
    } 
    try {
        await task.save();
    } catch(e) {
        logger.error('Not possible to save a new task to the DB');
        logger.error(e)
        res.status(500).end();
        return;
    }
    res.end(JSON.stringify(task));

})

app.get('/tasks/:id', placeUserData, (req, res) => {
    
})