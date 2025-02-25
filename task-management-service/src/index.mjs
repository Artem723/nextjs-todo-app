import express from 'express'
import logger from './logger/index.mjs';
import { placeUserData } from './middlewares.mjs';
import cookieParser from 'cookie-parser';
import TaskModel from './db/Models/TaskModel.mjs'
import TaskActivityModel from './db/Models/TaskActivityModel.mjs'
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
            logger.debug(`Task validation failed: ${e.errors}`)
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
app.get('/tasks', placeUserData, async (req, res) => {
    const { userId } = res.locals;
    try {
        const tasks = await TaskModel.getTasksByUserId(userId, req.query);
        res.end(JSON.stringify(tasks));
        return;
    } catch(err) {
        if (err instanceof mongoose.Error.ValidationError) {
            logger.debug(`Request is invalid: ${e.errors}`)
            res.status(400).end(err.message);
            return;
        } else {
            logger.error(`Internal error: ${err.message}`)
            logger.error(err);
            res.status(500).end('Internal Error.')
            return;
        }
    }
})



app.get('/tasks/:id', placeUserData, async (req, res) => {
    const { userId } = res.locals;
    const taskId = req.params.id;
    let task = null;
    try {
        task = await task.getOneTaskByIdAndUserId(taskId, userId);
    } catch (e) {
        logger.error(`Cannot retrieve task from DB. userId: ${userId}; taskId: ${taskId} `)
        res.status(500).end('Internal error.');
        return;
    }
    
    if (!task) {
        res.status(404).end('Not Found.');
        
    } else {
        res.end(JSON.stringify(task));
    } 
})

app.get('/tasks/:id/activity', async (req, res) => {
    const { userId } = res.locals;
    const taskId = req.params.id;

    try {
        const activities = await TaskActivityModel.getActivityListForTaskId(taskId, userId, req.query);
        res.end(JSON.stringify(activities))
    } catch (err) {
        logger.error('Error retrieving activities from the database');
        logger.error(err)
        res.status(500).end('Internal Server Error');
    }
})

app.patch('/task/:id', placeUserData, (req, res) => {
    throw new Error('Not implemented!');
})

app.delete('/task/:id', placeUserData, async (req, res) => {
    const { userId } = res.locals;
    const taskId = req.params.id;
    let task = null;
    try {
        task = await task.deleteOneTaskByIdAndUserId(taskId, userId);
    } catch (e) {
        logger.error(`Cannot delete task from DB. userId: ${userId}; taskId: ${taskId} `)
        res.status(500).end('Internal error.');
        return;
    }
    
    if (!task) {
        res.status(400).end('Bad request.');
        
    } else {
        res.end(JSON.stringify(task));
    } 
})

